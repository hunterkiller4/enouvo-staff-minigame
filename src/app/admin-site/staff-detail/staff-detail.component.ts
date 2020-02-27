import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../shared/staff.service';
import { Staff } from '../../shared/staff.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { GetStaff } from 'src/app/store/actions';
import { getStaff } from 'src/app/store/selectors/staff.selector';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private staffService: StaffService,
              private router: Router,
              private store: Store<AppState>) { }

  staff: Observable<Staff>;
  isLoadingResults = true;

  // getstaff(id) {
  //   this.staffService.getStaff(id)
  //     .subscribe(data => {
  //       this.staff = data;
  //       this.isLoadingResults = false;
  //     });
  // }

  deletestaff(id) {
    this.isLoadingResults = true;
    this.staffService.deleteStaff(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/admin']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  ngOnInit() {
    // this.getstaff(this.route.snapshot.params.id);
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetStaff(params.id));
    });
    this.staff = this.store.select(getStaff);
  }
}
