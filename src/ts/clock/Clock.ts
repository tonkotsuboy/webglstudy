import * as THREE from "three";
import MathUtil from "../util/MathUtil";

export default class Clock extends THREE.Object3D {

  private longHand:THREE.Mesh;
  private middleHand:THREE.Mesh;
  private shortHand:THREE.Mesh;

  public init() {
    this.addBackground();

    this.addHands();
  }

  private addBackground():void {
    const geometry = new THREE.CircleGeometry(2.05, 100);
    const material = new THREE.MeshPhongMaterial();
    material.side = THREE.DoubleSide;
    material.color = new THREE.Color(0xaaaaaa);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  private addHands():void {
    const material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(0x000000);
    material.specular = new THREE.Color(0xffffff);

    this.longHand = this.createHand(2, 0.01, material);
    this.middleHand = this.createHand(1.6, 0.06, material);
    this.shortHand = this.createHand(0.8, 0.08, material);

    this.add(this.longHand);
    this.add(this.middleHand);
    this.add(this.shortHand);

    this.addDots();
  }

  private createHand(long:number, width:number, material:THREE.MeshPhongMaterial):THREE.Mesh {
    const geometry = new THREE.BoxGeometry(width, long, 0.1);
    geometry.translate(0, long / 2, 0);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  private addDots():void {
    const dotNum = 60;
    const dotDistance = 2;

    for (let i = 0; i < dotNum; i++) {
      const longStyle = i % 5 === 0;
      const dot = this.createDot(longStyle);

      dot.position.x = dotDistance * Math.cos((i / dotNum) * 2 * Math.PI);
      dot.position.y = dotDistance * Math.sin((i / dotNum) * 2 * Math.PI);
      dot.rotation.z = (90 + (i / dotNum) * 360) * Math.PI / 180;
      this.add(dot);
    }
  }

  private createDot(longStyle:boolean):THREE.Mesh {
    const long = longStyle ? 0.08 : 0.04;

    const geometry = new THREE.PlaneGeometry(0.01, long);
    const material = new THREE.MeshPhongMaterial();
    material.side = THREE.DoubleSide;
    material.color = new THREE.Color(0x333333);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  public update() {

    if (!this.longHand) {
      return;
    }
    const currentTime = new Date();

    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    this.shortHand.rotation.z = 0;

    this.shortHand.rotation.z = -MathUtil.convertToRadian((hour / 12) * 360);
    this.middleHand.rotation.z = -MathUtil.convertToRadian((minute / 60) * 360);
    this.longHand.rotation.z = -MathUtil.convertToRadian((second / 60) * 360);
  }
}