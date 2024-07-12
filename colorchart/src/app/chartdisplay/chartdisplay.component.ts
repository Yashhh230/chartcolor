import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class ChartdisplayComponent implements OnInit {
  // chart: Chart | undefined;
  Highcharts = Highcharts;

  rgbForm = new FormGroup({
    rgbValues: new FormArray(this.createRgbControls(24)),
  });

  get rgbValues() {
    return this.rgbForm.get('rgbValues') as any;
  }

  ngOnInit(): void {
    this.updateRgbTable();
  }

  createRgbControls(count: number): FormGroup[] {
    const controls = [];
    for (let i = 0; i < count; i++) {
      controls.push(
        new FormGroup({
          i: new FormControl(0),
          red: new FormControl(0, [
            Validators.required,
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^\d+$/),
          ]),
          green: new FormControl(0, [
            Validators.required,
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^\d+$/),
          ]),
          blue: new FormControl(0, [
            Validators.required,
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^\d+$/),
          ]),
        })
      );
    }
    return controls;
  }
  onEdit(index: number) {
    const rgbGroup = this.rgbValues.at(index) as FormGroup;
    const red = parseInt(rgbGroup.controls['red'].value, 10);
    const green = parseInt(rgbGroup.controls['green'].value, 10);
    const blue = parseInt(rgbGroup.controls['blue'].value, 10);
    
    const total = red + green + blue;
    if (total !== 100) {
      alert(
        `Sum of RGB values must be 100. Current sum is ${total}. Please adjust the values.`
      );
      return;
    }

    this.newValue[index] = { i: index, red: red, green: green, blue: blue };
    this.updateChartData();
  }
  newValue = [
    { i: 0, red: 30, green: 40, blue: 30, color: '#ffffff' },
    { i: 1, red: 20, green: 50, blue: 30 },
    { i: 2, red: 40, green: 20, blue: 40 },
    { i: 3, red: 40, green: 20, blue: 40 },
    { i: 4, red: 40, green: 20, blue: 40 },
    { i: 5, red: 40, green: 20, blue: 40 },
    { i: 6, red: 40, green: 20, blue: 40 },
    { i: 7, red: 40, green: 20, blue: 40 },
    { i: 8, red: 40, green: 20, blue: 40 },
    { i: 9, red: 40, green: 20, blue: 40 },
    { i: 10, red: 40, green: 20, blue: 40 },
    { i: 11, red: 40, green: 20, blue: 40 },
    { i: 12, red: 40, green: 20, blue: 40 },
    { i: 13, red: 40, green: 20, blue: 40 },
    { i: 14, red: 40, green: 20, blue: 40 },
    { i: 15, red: 40, green: 20, blue: 40 },
    { i: 16, red: 40, green: 20, blue: 40 },
    { i: 17, red: 40, green: 20, blue: 40 },
    { i: 18, red: 40, green: 20, blue: 40 },
    { i: 19, red: 40, green: 20, blue: 40 },
    { i: 20, red: 40, green: 20, blue: 40 },
    { i: 21, red: 40, green: 20, blue: 40 },
    { i: 22, red: 40, green: 20, blue: 40 },
    { i: 23, red: 40, green: 20, blue: 40 },
  ];

  title = 'highcharts';
  updateFromInput = false;
  updateFlag = false;
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
          dragMinY: 0,
          dragMaxY: 100,
        },
        point: {
          events: {
            drop: (event: any) => {
              this.newValue.forEach((element: any) => {
                if (element.i === event.target.category) {
                  const draggedValue = Math.ceil(event.target.y);
                  const remaining = 100 - draggedValue;
                  const propertyToUpdate = event.target.color as
                    | 'red'
                    | 'green'
                    | 'blue';

                  // Update the dragged color value
                  element[propertyToUpdate] = draggedValue;

                  // Calculate the remaining values for other colors
                  const otherColors = ['red', 'green', 'blue'].filter(
                    (color) => color !== propertyToUpdate
                  );
                  const splitValue = Math.floor(remaining / otherColors.length);
                  const remainder = remaining % otherColors.length;

                  // Distribute remaining value among other colors
                  otherColors.forEach((color) => {
                    element[color] = splitValue;
                  });

                  // Adjust one color with remainder to ensure sum is 100
                  if (remainder !== 0) {
                    element[otherColors[0]] += remainder;
                  }

                  this.newValue[element.i] = element;
                }
              });

              this.updateChartData();
            },
          },
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
        color: 'green',
        data: this.newValue.map((element) => element.green),
      } as Highcharts.SeriesOptionsType,
      {
        name: 'Red',
        color: 'red',
        data: this.newValue.map((element) => element.red),
      } as Highcharts.SeriesOptionsType,
      {
        name: 'Blue',
        color: 'blue',
        data: this.newValue.map((element) => element.blue), // Initial random data
      } as Highcharts.SeriesOptionsType,
    ],
  };

  patchRgbValues(
    data: { i: number; red: number; green: number; blue: number }[]
  ) {
    data.forEach((item) => {
      const rgbGroup = this.rgbValues.at(item.i);
      rgbGroup.patchValue({
        red: item.red,
        green: item.green,
        blue: item.blue,
      });
    });
  }

  updateRgbTable() {
    this.patchRgbValues(this.newValue);
  }

  updateChartData() {
    this.updateFromInput = true;
    this.updateFlag = true;
    this.chartOptions = {};
    this.chartOptions.series = [
      {
        name: 'Green',
        color: 'green',
        data: this.newValue.map((element) => element.green),
      } as any,
      {
        name: 'Red',
        color: 'red',
        data: this.newValue.map((element) => element.red),
      } as Highcharts.SeriesOptionsType,
      {
        name: 'Blue',
        color: 'blue',
        data: this.newValue.map((element) => element.blue), // Initial random data
      } as Highcharts.SeriesOptionsType,
    ];
    this.updateRgbTable();
  }
}


//     if (element.i === event.target.category) {
//       const remaining = 100 - Math.ceil(event.target.y);
//       const propertyToUpdate = event.target.color as 'red' | 'green' | 'blue';

//   // Update the dragged color value
//   element[propertyToUpdate] = Math.ceil(event.target.y);

//   // Adjust other colors to maintain the sum as 100
//   ['red', 'green', 'blue'].forEach((color: 'red' | 'green' | 'blue') => {
//     if (color !== propertyToUpdate) {
//       element[color] = Math.floor(remaining / 2); // Adjust other colors equally
//       remaining -= element[color];
//     }
//   });

//   this.newValue[element.i] = element;
// }
//   });

//   this.updateChartData();
// },
