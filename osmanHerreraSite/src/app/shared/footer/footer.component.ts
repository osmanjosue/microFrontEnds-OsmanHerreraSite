import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent implements OnInit {

  public contactForm!: FormGroup;
  public isSending: boolean = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correoElectronico: ['', [
        Validators.required,
        Validators.pattern(/^\S+@\S+$/i)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    });
  }

  // Get para facilitar el acceso a los controles en el HTML
  get f() {
    return this.contactForm.controls;
  }

  enviarFormularioContacto() {
    // Doble seguridad: si es inválido o ya se está enviando, no hace nada
    if (this.contactForm.invalid || this.isSending) return;

    this.isSending = true;

    this.emailService.enviarCorreo(this.contactForm.value)
      .pipe(
        finalize(() => {
          this.isSending = false;
        })
      )
      .subscribe({
        next: () => {
          alert("Mensaje enviado con éxito");
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Error en el envío:', err);
          alert("No se pudo enviar el mensaje");
        }
      });
  }
}
