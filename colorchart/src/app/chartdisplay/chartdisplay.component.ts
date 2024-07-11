import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

declare var require: any;
const Draggable = require('highcharts/modules/draggable-points.js');
Draggable(Highcharts);

const Exporting = require('highcharts/modules/exporting.js');
Exporting(Highcharts);

@Component({
  selector: 'app-chartdisplay',
  templateUrl: './chartdisplay.component.html',
  styleUrls: ['./chartdisplay.component.scss'],
})
export class ChartdisplayComponent {
  // chart: Chart | undefined;
  Highcharts = Highcharts;

  rgbForm = new FormGroup({
    rgbValues: new FormArray(this.createRgbControls(24)),
  });

  get rgbValues() {
    return this.rgbForm.get('rgbValues') as FormArray;
  }

  createRgbControls(count: number): FormGroup[] {
    const controls = [];
    for (let i = 0; i < count; i++) {
      controls.push(
        new FormGroup({
          r: new FormControl(0),
          g: new FormControl(0),
          b: new FormControl(0),
        })
      );
    }
    return controls;
  }
  onSubmit() {}

  title = 'highcharts';
  updateFromInput = false;
  oneToOneFlag = true; // optional boolean, defaults to false
  chartConstructor = 'chart'; // chart defaul and stockChart for Stocks with Range
  chartOptions: Highcharts.Options = {
    chart: {
      animation: false,
    },

    title: {
      text: 'Color Opacity',
    },


    yAxis: {
      softMin: 0,
      softMax: 100,
    },

    plotOptions: {
      series: {
        stickyTracking: true,
        dragDrop: {
          draggableY: true,
        },
      },
      line: {
        cursor: 'ns-resize',
      },
    },

    tooltip: {
      valueDecimals: 2,
    },

    series: [
      {
        name: 'Green',
        data: [
          0, 71, 20, 29, 44, 76, 35, 48, 16, 94, 95, 54, 22, 78, 33, 78, 14, 89,
          78, 32, 11, 25, 20, 77,
        ],
      } as any,
      {
        name: 'Red',
        data: [
          0, 1, 20, 29, 44, 76, 35, 48, 16, 94, 95, 54, 22, 78, 33, 78, 14, 89,
          78, 32, 11, 25, 20, 77,
        ],
      } as any,
      {
        name: 'Yellow',
        data: [
          89, 60, 15, 83, 37, 33, 14, 91, 1, 37, 39, 46, 67, 71, 87, 80, 51, 80,
          88, 92, 4, 22, 34, 81,
        ],
      } as any,
    ],
  };

  // chartOptions = {
  //   chart: {
  //     animation: false
  //   },

  //   title: {
  //     text: "Color Opacity"
  //   },
  //   plotOptions: {
  //     series: {
  //       stickyTracking: false,
  //       dragDrop: {
  //         draggableY: true
  //       }
  //     },
  //   },
  //   column: {
  //     stacking: "normal",
  //     minPointLength: 2
  //   },
  //   line: {
  //     cursor: "ns-resize"
  //   },
  //   tooltip: {
  //     valueDecimals: 2
  //   },
  //   series: [
  //     {
  //       data: [
  //         0,
  //       44,
  //       ],
  //       type: "column"
  //     },
  //     {
  //       data: [
  //         0,

  //         106.4,
  //         129.2,
  //         144.0,
  //         176.0,
  //         135.6,
  //         148.5,
  //         216.4,
  //         194.1,
  //         95.6,
  //         54.4
  //       ].reverse(),
  //       type: "column"
  //     },
  //     {
  //       data: [
  //         0,
  //         71.5,
  //         106.4,
  //         129.2,
  //         144.0,
  //         176.0,
  //         135.6,
  //         148.5,
  //         216.4,
  //         194.1,
  //         95.6,
  //         54.4
  //       ]
  //     }
  //   ]
  // };

  ngAfterViewInit(): void {}

  onValueChange(index: number) {
    const rgbGroup = this.rgbValues.at(index) as FormGroup;
    let r = rgbGroup.controls['r'].value;
    let g = rgbGroup.controls['g'].value;
    let b = rgbGroup.controls['b'].value;

    const total = r + g + b;
    if (total > 100) {
      const excess = total - 100;
      const rRatio = r / total;
      const gRatio = g / total;
      const bRatio = b / total;

      r = Math.max(0, r - excess * rRatio);
      g = Math.max(0, g - excess * gRatio);
      b = Math.max(0, b - excess * bRatio);

      rgbGroup.setValue({ r, g, b }, { emitEvent: false });
    }

    // this.updateChartData();
  }
  // updateChartData() {
  //   this.chart.data.datasets[0].data = this.rgbValues.controls.map(ctrl => ctrl.value.r);
  //   this.chart.data.datasets[1].data = this.rgbValues.controls.map(ctrl => ctrl.value.g);
  //   this.chart.data.datasets[2].data = this.rgbValues.controls.map(ctrl => ctrl.value.b);
  //   this.chart.update();
  // }

  getValue(r : any , g :any , b : any) {
    console.log(r)
    console.log(g)
    console.log(b)
  }
}
