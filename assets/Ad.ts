import { _decorator, Component, log, Node, sys } from "cc";
import { Label } from "cc";
// import Yodo1Ads from "./Yodo1Ads";
// import { Component } from "cc";
// import { AdMob } from "google-admob";
// import * as google from "google-ads-ima";

import { native } from "cc";
// const { reflection } = native;
// const AD_UNIT_ID = "ca-app-pub-3940256099942544~3347511713"; // Replace with your own Ad Unit ID

import { NATIVE } from "cc/env";
const { ccclass, property } = _decorator;

@ccclass
export default class AdManager extends Component {
  @property({ type: Node })
  ShowButton: Node = null;
  @property({ type: Node })
  LoadButton: Node = null;
  @property({ type: Label })
  label: Label = null;
  @property({ type: Label })
  LoadingButtonLabel: Label = null;
  loadAd() {
    this.label.string = "Ads:Loading";

    if (NATIVE) {
      native.reflection.callStaticMethod(
        "com/cocos/game/AppActivity",
        "loadingAds",
        "()V"
      );
    }
    this.LoadingButtonLabel.string = "Loading...";
    setTimeout(() => {
      this.LoadButton.active = false;
      this.ShowButton.active = true;
      this.label.string = "Ads:Loaded";
    }, 3000);
  }
  onLoad() {
    this.label.string = "Welcome to Ad Mob";
  }
  showAd() {
    console.log("In showAd");
    if (NATIVE) {
      native.reflection.callStaticMethod(
        "com/cocos/game/AppActivity",
        "presentAds",
        "()V"
      );
    }
    this.ShowButton.active = false;
    this.LoadButton.active = true;
    this.LoadingButtonLabel.string = "Load";
    this.label.string = "Welcome to AdMob";
  }
}
