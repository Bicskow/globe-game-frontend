import * as THREE from "three";
import $ from "jquery";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import TWEEN from "@tweenjs/tween.js";
import { PerspectiveCamera } from "three";
let ProgressBar = require("progressbar.js");

export default class CountryGlobe {
  private container: Element;
  private basePath: string;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private raycaster = new THREE.Raycaster();
  private objLoader: OBJLoader;
  private progressBar: any;
  private progressElement: HTMLDivElement = document.createElement("div");

  private radius: number = 5;
  private orbitUpdate: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private controls: OrbitControls;
  private highlightedCountry: string = "";
  private highlightOnClickEnabled = true;

  private resolution = "110m";
  private countryObjects = [] as THREE.Object3D[];
  private countryData: any;

  private orbitCoords = new THREE.Spherical(75, Math.PI / 2, 0);

  constructor(ct: Element, basePath = "") {
    this.objLoader = new OBJLoader();

    this.container = ct;
    this.basePath = basePath;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new PerspectiveCamera();

    this.setupCamera();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.setupOrbitControls();
    this.setupRenderer();
    this.setupGlobeGeometry();
    this.setupLigth();
    this.fitToClientSize();
    this.setDefaultCoords();
    this.createProgressBar();
    this.loadCountriesJson();
    this.render();

    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      this.fitToClientSize();
    });
  }

  private setupOrbitControls() {
    this.controls.enableDamping = false;
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 5.5;
    this.controls.maxDistance = 75.0;

    this.controls.addEventListener("change", () => {
      let zoom = this.controls.target.distanceTo(this.controls.object.position);
      this.controls.rotateSpeed = zoom / 150.0;
    });
  }

  private setupRenderer() {
    this.renderer.setClearColor("#050505");

    this.renderer.domElement.style.position = "relative";
    this.renderer.domElement.style.top = "0";
    this.renderer.domElement.style.left = "0";
    this.renderer.domElement.style.bottom = "0";
    this.renderer.domElement.style.right = "0";
    this.renderer.domElement.style.textAlign = "center";

    this.renderer.domElement.addEventListener(
      "mousedown",
      this.onMouseDown.bind(this) as any
    );
  }

  private setupGlobeGeometry() {
    let globeGeometry = new THREE.SphereGeometry(this.radius - 0.01, 100, 100);

    let globeMaterial = new THREE.MeshPhongMaterial({ color: 0x3471eb });
    let globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    this.scene.add(globeMesh);
  }

  private setupLigth() {
    const light = new THREE.PointLight(0xffffff, 1, 0, 2);
    light.position.set(1000, 5, 1500);
    this.camera.add(light);
  }

  private setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      10,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.setFromSpherical(this.orbitCoords);
    this.scene.add(this.camera);
  }

  private createProgressBar() {
    this.progressElement.id = "progress";
    this.progressElement.style.zIndex = "1";
    this.progressElement.style.position = "absolute";
    this.progressElement.style.top =
      (this.container.clientHeight / 2).toString() + "px";
    this.progressElement.style.left = "25px";
    this.progressElement.style.textAlign = "center";

    this.progressElement.style.height = "10px";
    this.progressElement.style.width =
      (this.container.clientWidth - 50).toString() + "px";

    this.container.appendChild(this.progressElement);
    this.progressBar = new ProgressBar.Line("#progress", {
      strokeWidth: 4,
      easing: "easeInOut",
      duration: 0,
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: { width: "100%", height: "100%" },
      text: {
        style: {
          color: "#999",
          position: "absolute",
          right: "0",
          top: "30px",
          padding: 0,
          margin: 0,
          transform: null,
        },
        autoStyleContainer: false,
      },
      from: { color: "#FFEA82" },
      to: { color: "#ED6A5A" },
      step: (state: any, bar: any) => {
        bar.setText(Math.round(bar.value() * 100) + " %");
      },
    });
  }

  private addCountryOBJ(object: THREE.Object3D) {
    object.name = (object as any).materialLibraries[0].replace(".mtl", "");
    this.countryObjects.push(object);
    let country_material = new THREE.MeshPhongMaterial({
      color: this.countryData[object.name]["color"],
    });
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = country_material;
      }
    });
    this.scene.add(object);
  }

  private addCountryBorderOBJ(object: THREE.Object3D) {
    let color = 0x000000;
    let border_material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 1,
    });
    object.traverse(function (child) {
      if (child instanceof THREE.Line) {
        child.material = border_material;
      }
    });
    this.scene.add(object);
  }

  private loadCountryOBJ(objFile: string) {
    return new Promise((resolve) => {
      this.objLoader.load(
        objFile,
        this.addCountryOBJ.bind(this),
        (event: ProgressEvent) => {
          if (event.loaded === event.total) {
            resolve(true);
          }
        }
      );
    });
  }

  private loadCountryBorderOBJ(objFile: string) {
    this.objLoader.load(objFile, this.addCountryBorderOBJ.bind(this));
  }

  private async loadCountriesJsonData(data: any) {
    console.log("Loading country objs and borders countries data");
    this.countryData = data;

    let counter = 0;
    for (let coutry in data) {
      if (data[coutry][this.resolution]) {
        await this.loadCountryOBJ(
          `${this.basePath}/3dobj/${this.resolution}/${data[coutry]["fileName"]}`
        );
        let bar = ++counter / Object.keys(data).length;
        this.progressBar.animate(bar);
        if (bar >= 1) {
          this.progressElement.style.zIndex = "-1";
          this.dispatchCountryGlobeLoaded();
        }
      } else {
        counter++;
      }
    }
  }

  private loadCountriesJson() {
    console.log("Loading countries JSON");
    $.getJSON(
      this.basePath + "resources/countries.json",
      this.loadCountriesJsonData.bind(this)
    );
  }

  private render() {
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    TWEEN.update();

    if (this.orbitUpdate) {
      this.camera.position.setFromSpherical(this.orbitCoords);
    } else {
      this.orbitCoords.setFromVector3(this.camera.position);
    }
  }

  private getIntersections() {
    let sizeVec = new THREE.Vector2();
    this.renderer.getSize(sizeVec);
    let mouse = new THREE.Vector2();
    mouse.x = (this.mouseX / sizeVec.x) * 2 - 1;
    mouse.y = -(this.mouseY / sizeVec.y) * 2 + 1;
    this.raycaster.setFromCamera(mouse, this.camera);

    for (let object of this.countryObjects) {
      for (let child of object.children) {
        let intersects = this.raycaster.intersectObject(child);
        if (intersects.length !== 0) {
          return object;
        }
      }
    }
    return null;
  }

  private setObjectColor(obj: THREE.Object3D, colNum: number) {
    if (obj != null) {
      var select_material = new THREE.MeshPhongMaterial({ color: colNum });
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = select_material;
        }
      });
    }
  }

  private onMouseDown(evt: MouseEvent) {
    evt.preventDefault();

    let viewportOffset = this.renderer.domElement.getBoundingClientRect();
    let top = viewportOffset.top;
    let left = viewportOffset.left;

    this.mouseX = evt.clientX - left;
    this.mouseY = evt.clientY - top;

    if (this.highlightOnClickEnabled) {
      let obj = this.getIntersections();
      if (obj != null) {
        this.highlightCounty(obj.name);
      }
    }
  }

  private orbitUpdateDone() {
    this.orbitUpdate = false;
  }

  private degrees_to_radians(deg: number) {
    return deg * (Math.PI / 180);
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async waitForCountryDataLoad(resolve: any) {
    while (typeof this.countryData === "undefined") {
      await this.sleep(100);
    }
    let countryList = [];
    for (let country in this.countryData) {
      if (this.countryData[country][this.resolution]) {
        countryList.push(country);
      }
    }
    resolve(countryList);
  }

  private dispatchCountrySelected(country: string) {
    let event = new CustomEvent("country_selected", { detail: country });
    this.container.dispatchEvent(event);
  }

  private dispatchCountryGlobeLoaded() {
    let event = new CustomEvent("country_globe_loaded");
    this.container.dispatchEvent(event);
  }

  public fitToClientSize = () => {
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
  };

  public setContainer(ct: Element) {
    this.container = ct;
    ct.appendChild(this.renderer.domElement);
  }

  public setHighlightOnClickEnabled(value: boolean) {
    this.highlightOnClickEnabled = value;
  }

  public highlightCounty(country: string) {
    if (this.highlightedCountry === country) {
      this.removeCountryHighlight();
      this.dispatchCountrySelected("");
      return;
    }
    this.removeCountryHighlight();

    for (let object of this.countryObjects) {
      if (object.name === country) {
        this.setObjectColor(object, 0xfcf0513);
        this.highlightedCountry = country;
        this.dispatchCountrySelected(this.highlightedCountry);
      }
    }
    console.log(this.highlightedCountry);
  }

  public getCountryList(): Promise<string[]> {
    return new Promise((resolve) => {
      this.waitForCountryDataLoad.bind(this)(resolve);
    });
  }

  public async setOrbit(lat: number, lng: number, zoom: number) {
    this.orbitUpdate = true;
    let sp2 = new THREE.Spherical(
      zoom,
      this.degrees_to_radians(lat * -1 + 90),
      this.degrees_to_radians(lng + 90)
    );
    let sp1 = new THREE.Spherical(
      75,
      (sp2.phi + this.orbitCoords.phi) / 2,
      (sp2.theta + this.orbitCoords.theta) / 2
    );
    TWEEN.removeAll();
    let camTween1 = new TWEEN.Tween(this.orbitCoords)
      .to(sp1, 1000)
      .easing(TWEEN.Easing.Quadratic.In);
    let camTween2 = new TWEEN.Tween(this.orbitCoords)
      .to(sp2, 1000)
      .easing(TWEEN.Easing.Quadratic.Out);
    camTween2.onComplete(this.orbitUpdateDone.bind(this));
    camTween1.chain(camTween2);
    camTween1.start();
  }

  public zoomToCountry(country: string) {
    console.log(this.countryData[country]["lat"]);
    console.log(this.countryData[country]["lng"]);
    this.setOrbit(
      this.countryData[country]["lat"],
      this.countryData[country]["lng"],
      this.countryData[country]["zoom"]
    );
  }

  public removeCountryHighlight() {
    if (this.highlightedCountry) {
      for (let object of this.countryObjects) {
        if (object.name === this.highlightedCountry) {
          this.setObjectColor(
            object,
            this.countryData[this.highlightedCountry]["color"]
          );
          this.highlightedCountry = "";
        }
      }
    }
  }

  public setDefaultCoords() {
    this.orbitCoords = new THREE.Spherical(75, Math.PI / 2, 0);
    this.camera.position.setFromSpherical(this.orbitCoords);
    this.controls.reset();
  }
}
