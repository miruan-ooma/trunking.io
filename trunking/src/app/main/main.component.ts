import { Component } from "@angular/core";
import { views } from "../../core/views";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss"
})
export class MainComponent {
  views = views;
  menu = [
    { text: "Dashboard", children: [], icon: "home", link: "./" },
    {
      text: "Account",
      icon: "account_box",
      children: [
        { text: "My Login Settings", link: views.DASHBOARD },
        { text: "Company Management" },
        { text: "Manage Logins" }
      ]
    },
    {
      text: "My Voice Network",
      icon: "phone",
      children: [
        { text: "Trunk Groups" },
        { text: "STIR/SHAKEN" },
        { text: "Buy DIDs" },
        { text: "Manage DIDs" }
      ]
    },
    {
      text: "Billing",
      icon: "wallet",
      children: [
        { text: "Make a Payment" },
        { text: "Invoices" },
        { text: "Call Detail Records" },
        { text: "Tax Management" }
      ]
    },
    {
      text: "Reporting",
      icon: "bar_chart",
      children: [{ text: "Voice" }]
    },
    {
      text: "Support",
      icon: "info",
      children: [
        { text: "Knowledge Base" },
        { text: "Terms of Service" },
        { text: "Privacy Policy" }
      ]
    }
  ];
}
