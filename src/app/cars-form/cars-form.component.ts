import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import {Car, Cars} from '../car.model';
import * as moment from 'moment';
import {AppState} from '../redux/app.state';
import {AddCar} from '../redux/cars.action';
import {CarsService} from '../cars.service';

import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent implements OnInit {
  carName: string = '';
  carModel: string = '';
  // public car: Partial<Car> = {};

  // @Output() addCar = new EventEmitter<Car>();

  // private id: number = 2;
  availableCars: Car[] = [];

  selectedCars: Car[];

  draggedCar: Car;

  public carState: Observable<Cars>;


  constructor(private store: Store<AppState>, private service: CarsService) {}

  ngOnInit() {
    this.carState = this.store.select('carPage');
    this.selectedCars = [];
    // this.carService.getCarsSmall().then(cars => this.availableCars = cars);
    this.service.preloadCars().subscribe(cars => this.availableCars = cars);
    // this.service.preloadCars().subscribe(cars => {
    //   for (let i = 0; i < cars.length; i++) {
    //     if (cars[i].isSolid === false) {
    //       this.availableCars.push(cars[i]);
    //     }
    //   }
    // });
    // this.service.preloadCars().subscribe(cars => {
    //   for (let i = 0; i < cars.length; i++) {
    //     if (cars[i].isSolid === true) {
    //       this.selectedCars.push(cars[i]);
    //     }
    //   }
    // });
  }

  dragStart(event, car: Car) {
    this.draggedCar = car;
  }

  drop(event) {
    if (this.draggedCar) {
      const draggedCarIndex = this.findIndex(this.draggedCar);
      console.log(draggedCarIndex);
      this.draggedCar.isSolid = true;
      this.service.updateCar(this.draggedCar);
      // this.selectedCars = [...this.selectedCars, this.draggedCar];
      // this.availableCars = this.availableCars.filter((val, i) => i !== draggedCarIndex);
      this.draggedCar = null;
    }
  }

  dragEnd(event) {
    this.draggedCar = null;
  }

  findIndex(car: Car) {
    let index = -1;
    for (let i = 0; i < this.availableCars.length; i++) {
      if (car.name === this.availableCars[i].name) {
        index = i;
        break;
      }
    }
    return index;
  }




  onAdd() {
    if (this.carModel === '' || this.carName === '') { return; }

    // this.id = ++this.id;

    // this.car.name =

    const car = new Car(
      this.carName,
      moment().format('DD.MM.YY'),
      this.carModel,
      false,
      // this.id
    );
    // this.addCar.emit(car);
    // this.store.dispatch(new AddCar(car));
    this.service.addCar(car);

    this.carName = '';
    this.carModel = '';
  }

  onLoad() {
    this.service.loadCars();
  }
}
