import { Component, OnInit } from '@angular/core';
import { Breadcrumb, BreadcrumbService } from 'angular-crumbs';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-spike';
  menuIcon = faBars;
  opened = false;
  constructor(
    private titleService: Title,
    private breadcrumbService: BreadcrumbService,
  ) { }
  ngOnInit(){
    this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
      //this.titleService.setTitle(this.createTitle(crumbs));
  });
  }
  private createTitle(routesCollection: Breadcrumb[]) {
    const title = 'Angular Breadcrumb';
    const titles = routesCollection.filter((route) => route.displayName);

    if (!titles.length) { return title; }

    const routeTitle = this.titlesToString(titles);
    return `${routeTitle} ${title}`;
}

private titlesToString(titles) {
  return titles.reduce((prev, curr) => {
      return `${curr.displayName} - ${prev}`;
  }, '');
}
}
