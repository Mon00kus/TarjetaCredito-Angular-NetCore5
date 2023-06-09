import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  id : number | undefined;

  accion : string = 'agregar';

  listTarjetas : any[] = [
    /* {titulo: 'Juan perez', numeroTarjeta: '81818128181', fechaExpiration: '11/23', cvv:'123'},
    {titulo: 'Miguel gonzalez', numeroTarjeta: '13423423423', fechaExpiration: '11/24', cvv:'321'} */
  ];

  form : FormGroup;

  constructor(private fb : FormBuilder,
              private toastr : ToastrService,
              private tarjetaService : TarjetaService ) {
    this.form = this.fb.group ({
      titulo : ['', Validators.required],
      numeroTarjeta : ['',[Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
   }

  ngOnInit(): void {
    this.GetTarjetas();
  }

  AgregarTarjeta(){
    if (this.form.valid) {
      const  tarjeta : any = {
        titulo: this.form.get('titulo')?.value,
        numeroTarjeta : this.form.get('numeroTarjeta')?.value,
        fechaExpiracion : this.form.get('fechaExpiracion')?.value,
        cvv : this.form.get('cvv')?.value
      }
      /* this.listTarjetas.push(tarjeta); */
      if (this.id==undefined){
        //Agregamos una nueva tarjeta
        this.tarjetaService.saveTarjeta(tarjeta).subscribe(data=>{
          this.toastr.success('Tarjeta agregada exitosamente!', 'Credit card Added');
          this.GetTarjetas();
          this.form.reset();
        }, error =>{
          this.toastr.error('Ocurrio un error al agregar tarjeta','Error happens On Save');
          console.log('Error al guardar tarjeta');
        });
      }else{
        // Estamos editando la tarjeta
        tarjeta.id = this.id;
        this.tarjetaService.updateTajeta(this.id, tarjeta).subscribe(data=>{
          this.form.reset();
          this.accion = 'agregar'
          this.id = undefined;
          this.toastr.info('Tarjeta actualizada con exito','Card updated');
          this.GetTarjetas();
        }, error =>{
          console.log(error);
        })
      }
    }else{
      this.toastr.success('Problema de validacion del Form!', 'Form trouble');
      console.log('Invalid Form');
    }
  }

  /* EliminarTarjeta(index : number) : void {
    this.listTarjetas.splice(index,1);
    this.toastr.error('Tarjeta eliminada con exito!', 'Credit Card delete');
  } */

  GetTarjetas() {
    this.tarjetaService.getListTarjetas().subscribe(data=>{
       console.log(data);
       this.listTarjetas = data;
    }, error => {
       console.log(error)
    });
  }

  DeleteTarjeta(id:number){
    this.tarjetaService.deleteTarjeta(id).subscribe(data=>{
        this.toastr.error("Tarjeta eliminada","Card delete");
        this.GetTarjetas();
    }, error =>{
        console.error(error);
    })
  }

  EditTarjeta(tarjeta: any){
    /* console.log(tarjeta); */
    this.accion='editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      titulo : tarjeta.titulo,
      numeroTarjeta : tarjeta.numeroTarjeta,
      fechaExpiracion : tarjeta.fechaExpiracion,
      cvv : tarjeta.cvv
    });
  }
}
