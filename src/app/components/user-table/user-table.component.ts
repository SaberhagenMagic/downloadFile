import { Component, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
// Services
import { AppService } from '../../app.service';

const EXCEL_TYPE = 'applicatio0/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [AppService]
})
export class UserTableComponent implements OnInit {
  usuarios: User[];

  constructor(
    private srv: AppService,
    private fileSaverService: FileSaverService
  ) {
    this.srv.getUsers().pipe(
      map( (arrUsers: User[]) => {
        return arrUsers.map( (usr: User) => {
          return { id: usr.id, name: usr.name, email: usr.email, phone: usr.phone };
        });
      } )
    ).subscribe((data: User[]) => {
      if (data && data.length > 0) {
        this.usuarios = data;
      }
      console.log(this.usuarios);
    }, (error: any) => {
      console.log(error);
    });
  }

  ngOnInit() { }

  downloadUsr(): void {
    const headers: string[] = ['id', 'name', 'email', 'phone'];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.usuarios, { header: headers, cellDates: false });
    const workbook: XLSX.WorkBook = { Sheets: { ['Usuarios']: worksheet }, SheetNames: ['Usuarios'] };


    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobFile: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });

    this.fileSaverService.save(blobFile, 'usuarios.xlsx');
  }

}

class User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
