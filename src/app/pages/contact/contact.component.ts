import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  contactLinksList: { name: string; link: string }[] = [
    {
      name: 'Github Profile',
      link: 'www.github.com',
    },
    {
      name: 'Github Profile',
      link: 'www.github.com',
    },
  ];
}
