import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { timer } from 'rxjs';
import { AppConstants } from 'src/app/constants/constants';
import { BoardModel, SetupModel } from 'src/app/models/board-model';
import { BoardService } from 'src/app/services/board.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setup-board',
  templateUrl: './setup-board.component.html',
  styleUrls: ['./setup-board.component.css']
})
export class SetupBoardComponent implements OnInit {

  idSetupBoard: string = "";
  idBoard: string = "";
  isLoading: boolean = true;
  board?: BoardModel;
  deviceSetup?: SetupModel;
  inputBooleanChecked = false;
  inputBooleanCheckedControl = new FormControl();
  
  listOptionsCode: string[] = [
    "BME280",
    "DHT11 ",
    "DHT22",
    "LDR ",
    "TRIMPOT",
    "HC-SR04 ",
    "ACS758",
    "MQ-8",
    "MQ-3",
    "MQ-2",
    "MQ-7",
    "MQ-135",
    "AM2320",
    "P22",
    "H21A3",
    "ITR9608",
    "SWITCH",
    "PUSH BUTTON",
    "Switch Virtual",
    "Relé",
    "LED",
    "Transistor npn",
    "Transistor pnp",
    "Resistor",
    "Buzzer Ativo",
    "Motor CC",
  ].sort();

  form: FormGroup;

  constructor(private boardService: BoardService, private userService: UserService, private router: ActivatedRoute, private formBuilder: FormBuilder, private snackbar: MatSnackBar) {
    this.form = this.formBuilder.group({
      setup_name: [this.deviceSetup?.NAME, [Validators.required]],
      pin: [{value: this.deviceSetup?.PIN, disabled: true}, [Validators.required]],
      code: [this.deviceSetup?.CODE, [Validators.required]],
      value_type: [{value: this.deviceSetup?.VALUE_TYPE, disabled: true}, [Validators.required]],
      value: [this.deviceSetup?.VALUE, [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.idBoard = params[AppConstants.ROTAS_PARAMETERS.ID_BOARD];
      this.idSetupBoard = params[AppConstants.ROTAS_PARAMETERS.ID_SETUP];
      timer(500).subscribe((_) => this.getBoard());
    });
  }
  
  getBoard() {
    this.boardService.getBoardFromId(this.idBoard, this.userService).subscribe(
      (it) => {
        console.log(it)
        this.board = it.board;
        this.deviceSetup = this.board.device_setup.find((e) => e._id == this.idSetupBoard);
        this.form = this.formBuilder.group({
          setup_name: [this.deviceSetup?.NAME, [Validators.required]],
          pin: [{value: this.deviceSetup?.PIN, disabled: true}, [Validators.required]],
          code: [this.deviceSetup?.CODE, [Validators.required]],
          value_type: [{value: this.deviceSetup?.VALUE_TYPE, disabled: true}, [Validators.required]],
          value: [this.deviceSetup?.VALUE, [Validators.required]],
        });
        this.isLoading = false;
        if(this.deviceSetup?.VALUE_TYPE == "BOOL"){
          if(this.deviceSetup?.VALUE){
            this.inputBooleanCheckedControl.setValue(true);
            this.inputBooleanChecked = true;
          }else{
            this.inputBooleanCheckedControl.setValue(false);
            this.inputBooleanChecked = false;
          }
        }
      },
      (it) => {
        console.log(it);
      }
    );
  }

  changeInputBooleanChecked(value: MatCheckboxChange){
    this.inputBooleanChecked = value.checked;
  }

  save(){
    if (this.form.invalid) return;
    var data = this.form.getRawValue();
    var value;
    
    console.log(data['value'])
    if(this.deviceSetup?.VALUE_TYPE == "BOOL"){
      value = this.inputBooleanChecked;
    }else{      
      value = data['value'];
    }
    console.log(
      this.idBoard + " - " + data['setup_name'] + " - " + data['code'] + " - " + this.inputBooleanChecked + " - " + this.idSetupBoard  
    )
    this.boardService.postChangeSetup(this.userService, this.idBoard, data['setup_name'], data['code'], value, this.idSetupBoard).subscribe(
      (_) => {
        this.snackbar.open("Alterações salvas com sucesso!", "", { duration: 3000 });
        this.getBoard();
      },
      (it) => {
        console.log(it.error);
        this.snackbar.open(it.error ?? "Ocorreu um erro inesperado!", "X", { duration: 3000 });
      },
    );
  }

}
