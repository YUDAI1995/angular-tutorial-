import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecordModel } from '../model/record.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecordService } from '../service/record.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  recordFormControl = new FormGroup({
    category: new FormControl('0', Validators.required),
    title: new FormControl('', Validators.required),
    recordDate: new FormControl(new Date(), Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecordModel,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.recordFormControl.setValue({
        category: `${this.data.category}`,
        title: this.data.title,
        recordDate: this.data.recordDate,
      });
    } else {
      this.recordFormControl.setValue({
        category: '0',
        title: '',
        recordDate: new Date(),
      });
    }
  }

  public addRecord(): void {
    const category = +this.recordFormControl.controls['category'].value;
    const title = this.recordFormControl.controls['title'].value;
    const recordDate = this.recordFormControl.controls['recordDate'].value;

    if (!title) {
      return;
    }
    this.recordService
      .addRecord({
        id: undefined,
        category,
        title,
        recordDate,
        lastUpdate: undefined,
      } as RecordModel)
      .subscribe((_) => {
        this.dialogRef.close();
      });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
