import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardStateService } from '../../services/dashboard-state.service';
import { AngularModule } from '../../../../shared/modules/angular.module';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type.enum';

@Component({
  selector: 'app-chart-information',
  standalone: true,
  imports: [NgApexchartsModule, AngularModule],
  templateUrl: './chart-information.component.html',
  styleUrl: './chart-information.component.scss',
})
export class ChartInformationComponent {
  public chartOptionsBar: Partial<any>;
  public chartOptionsLine!: Partial<any>;

  vehicleTypeEnum = VehicleTypeEnum;
  timeRange: 'daily' | 'weekly' | 'monthly' = 'daily';

  constructor(private dashboardStateService: DashboardStateService) {
    const labels = Object.keys(
      this.dashboardStateService.getDashboardPieChartData()
    );
    const data = Object.values(
      this.dashboardStateService.getDashboardPieChartData()
    );
    this.chartOptionsBar = {
      series: data,
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.renderChart();
  }

  renderChart() {
    const aggregatedData = this.dashboardStateService.getDashboardLineChartData(
      this.timeRange
    );

    const formatValue: Record<string, number[]> = Object.fromEntries(
      Object.values(this.vehicleTypeEnum).map((type) => [type, []])
    );
    Object.entries(aggregatedData).forEach(([_, value]) => {
      Object.values(this.vehicleTypeEnum).forEach((type) => {
        formatValue[type].push(value[type] ?? 0);
      });
    });
    const values = Object.entries(formatValue).map(([name, data]) => ({ name, data }));


    const labels = Object.keys(aggregatedData);
    // const data = Object.values(aggregatedData);
    this.chartOptionsLine = this.chartOptionsLine = {
      series: values,
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: labels,
      },
    };
  }

  updateChart() {
    this.renderChart();
  }
}
