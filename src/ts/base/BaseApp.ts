import * as THREE from "three";
import * as ThreeOrbitControls from "three-orbit-controls";
export class BaseApp {

  private cotrols:THREE.OrbitControls;
  private stageWidth:number;
  private stageHeight:number;
  private renderer:THREE.WebGLRenderer;
  protected scene:THREE.Scene;
  private camera:THREE.PerspectiveCamera;

  constructor() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
    this.init();
  }

  protected init():void {

    this.scene = new THREE.Scene();

    this.initRenderer();
    this.initCamera();
    this.initLight();

    this.render();
  }

  private initLight() {
    const directional = new THREE.DirectionalLight(0xffffff);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(directional);
    this.scene.add(ambient);
  }

  private initRenderer():void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x333333);
    this.renderer.setSize(this.stageWidth, this.stageHeight);
    const webGLDom = <HTMLDivElement> document.getElementById("webgl");
    webGLDom.appendChild(this.renderer.domElement);
  }

  private initCamera():void {

    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.x = 0;
    this.camera.position.y = 2;
    this.camera.position.z = 5;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    let OrbitControls = ThreeOrbitControls(THREE);
    this.cotrols = new OrbitControls(this.camera, this.renderer.domElement);
  }

  protected render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }
}
