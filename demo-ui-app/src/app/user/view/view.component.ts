import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { routeConfig } from '../../app.routes';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  id!: number;
  user!: User;
  loading!: Boolean;
  breadcrumbs!: {title: string}[];

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.breadcrumbs = [routeConfig.home, routeConfig.users];
    this.loading = true;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['userId'];

    this.userService.find(this.id).subscribe((response: User) => {
      this.user = response;
      this.breadcrumbs.push({title: response.username});
      this.loading = false;
    })
  }
}
