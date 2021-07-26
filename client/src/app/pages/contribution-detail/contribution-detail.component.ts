import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresenceAbsence } from 'src/app/data/models/PresenceAbsence';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';

@Component({
  selector: 'app-contribution-detail',
  templateUrl: './contribution-detail.component.html',
  styleUrls: ['./contribution-detail.component.scss']
})
export class ContributionDetailComponent implements OnInit {

  private sub1: any;
  private sub2: any;

  data: PresenceAbsence

  idFromParam: string;

  loading: boolean = true;

  admin: string = 'admin'

  constructor(
    private activatedRoute: ActivatedRoute,
    private absencePresenceService: AbsencePresenceService
  ) { }

  ngOnInit(): void {
    this.sub1 = this.activatedRoute.params.subscribe(params => {

      this.idFromParam = params['id'];

      this.sub2 = this.absencePresenceService.getById(this.idFromParam).subscribe(result => {
        this.data = result;
        console.log(this.data)
      })

    })
  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }
    
  } 

}
