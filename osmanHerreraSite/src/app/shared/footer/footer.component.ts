import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {

  // private emailService = inject(EmailService);

  public formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) { }

  public contactForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correoElectronico: ['', [Validators.email, Validators.required]],
    content: ['', Validators.required]
  });

  enviarFormularioContacto() {
    if (this.contactForm.invalid) return; // Seguridad extra

    this.formSubmitted = true;

    this.emailService.enviarCorreo(this.contactForm.value)
      .subscribe({
        next: (resp) => {
          alert("¡Mensaje enviado con éxito!");
          this.formSubmitted = false;
          this.contactForm.reset();
        },
        error: (err) => {
          // 🛠️ Cambiamos esto para ver el error real en la alerta
          console.error('Error desde el componente:', err);
          alert(`Error al enviar: ${err.message || 'Error de servidor'}`);

          this.formSubmitted = false;
          // Opcional: No resetear el formulario si falló, para que el usuario no pierda lo escrito
        }
      });
  }

}
