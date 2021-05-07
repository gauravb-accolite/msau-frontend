import { Component, OnInit } from '@angular/core';
import { Onboardee } from '../entities/onboardee';
import { OnboardeeService } from '../services/onboardee.service';

interface trendData {
  xAxisLabel: string;
  yAxisLabel : string,
  legendTitle : string,
  data: any[]
}

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  view: number[] = [800, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  showLegend: boolean = true;

  OnboardeeVLocation: trendData = {
    xAxisLabel :'Location',
    yAxisLabel : 'Number of Onboardees',
    legendTitle : 'Onboarding Year',
    data: []
  }

  OnboardeeVYear: trendData = {
    xAxisLabel :'Location',
    yAxisLabel : 'Number of Onboardees',
    legendTitle : 'Onboarding Year',
    data: []
  }

  NormalizedOnboardeeVYear: trendData = {
    xAxisLabel :'Year',
    yAxisLabel : 'Normalized Number of Onboardees',
    legendTitle : 'Quarter',
    data: []
  }

  constructor(private onboardeeService: OnboardeeService) { }

  ngOnInit(): void {
    this.onboardeeService.getAllOnboardees().subscribe(
      (onboardees: Array<Onboardee>) => {
        let locationCounter = {}
        let yearCounter = {}
        let normalizedYearCounter = {}

        onboardees.forEach((onboardee: Onboardee) => {
          let location: string = this.extractLocation(onboardee.demandId)
          let date: Date = new Date(onboardee.onboardingStart)
          let year: string = date.getFullYear().toString()
          let quarter: string = this.getQuarter(date.getMonth())

          // OnboardeeVLocation
          if (location in locationCounter) {
            if (year in locationCounter[location]) {
              locationCounter[location][year] += 1
            } else {
              locationCounter[location][year] = 1
            }
          } else {
            locationCounter[location] = {}
            locationCounter[location][year] = 1
          }

          // OnboardeeVYear
          if (year in yearCounter) {
            yearCounter[year] += 1
          } else {
            yearCounter[year] = 1
          }

          // NormalizedOnboardeeVYear
          if (year in normalizedYearCounter) {
            if (quarter in normalizedYearCounter[year]){
              normalizedYearCounter[year][quarter] += 1
            } else {
              normalizedYearCounter[year][quarter] = 1
            }
          } else {
            normalizedYearCounter[year] = {}
            normalizedYearCounter[year][quarter] = 1
          }

        })

        // OnboardeeVLocation
        for (const location in locationCounter) {
          let obj = {
            "name": location,
            "series": []
          }
          for (const year in locationCounter[location]) {
            let yearObj = {
              "name" : year,
              "value": locationCounter[location][year]
            }
            obj["series"].push(yearObj)
          }
          this.OnboardeeVLocation.data.push(obj)
        }
        this.OnboardeeVLocation.data = [...this.OnboardeeVLocation.data]
        
        // OnboardeeVYear
        for (const year in yearCounter) {
          let obj = {
            "name": year,
            "value": yearCounter[year]
          }
          this.OnboardeeVYear.data.push(obj)
        }
        this.OnboardeeVYear.data = [...this.OnboardeeVYear.data]

        // NormalizedOnboardeeVYear

        for (const year in normalizedYearCounter) {
          let obj = {
            "name": year,
            "series": []
          }

          const ordered = Object.keys(normalizedYearCounter[year]).sort().reduce(
            (obj, key) => { 
              obj[key] = normalizedYearCounter[year][key]; 
              return obj;
            }, 
            {}
          )
  
          normalizedYearCounter[year] = ordered
          
          for (const quarter in normalizedYearCounter[year]) {
            let quarterObj = {
              "name" : quarter,
              "value": normalizedYearCounter[year][quarter]
            }
            obj["series"].push(quarterObj)
          }
          this.NormalizedOnboardeeVYear.data.push(obj)
        }
        this.NormalizedOnboardeeVYear.data = [...this.NormalizedOnboardeeVYear.data]

      }
    )
  }

  getQuarter = (month: number): string => {
    switch(true) {
      case (month < 3):
        return "Q1"
      case (month < 6):
        return "Q2"
      case (month < 9):
        return "Q3"
      default:
        return "Q4"
    }
  }

  extractLocation = (demandId: string): string => (demandId.slice(0, 3) == 'MUM' ? 'Mumbai' : 'Bangalore')

  // multi = [
  //   {
  //     "name": "Germany",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 7300000
  //       },
  //       {
  //         "name": "2011",
  //         "value": 8940000
  //       }
  //     ]
  //   },
  
  //   {
  //     "name": "USA",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 7870000
  //       },
  //       {
  //         "name": "2011",
  //         "value": 8270000
  //       }
  //     ]
  //   },
  
  //   {
  //     "name": "France",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 5000002
  //       },
  //       {
  //         "name": "2011",
  //         "value": 5800000
  //       }
  //     ]
  //   }
  // ];

}
