import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  constructor(private router: Router) {}

  navigateTo(path: string) {
    console.log(path)
    this.router.navigateByUrl(path);
  }

  @Input()
  breadcrumbs: any = [];
}
