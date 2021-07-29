import { Component, OnInit, OnDestroy } from '@angular/core';
import { Preference } from 'src/app/data/models/Preference';
import { PreferenceService } from 'src/app/data/services/preference.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preference-details',
  templateUrl: './preference-details.component.html',
  styleUrls: ['./preference-details.component.scss']
})
export class PreferenceDetailsComponent implements OnInit, OnDestroy {

  private sub1: any;

  preference: Preference;
  noPreference: boolean = false;

  loading: boolean = true;

  constructor(
    private preferenceService: PreferenceService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.sub1 = this.preferenceService.getPreferenceCurrentUser().subscribe(preference => {
      if(preference) {
        this.preference = preference;
        this.loading = false;
      } else {
        this.router.navigate(['/preference/create'])
      }
    })

  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }
  } 

}
