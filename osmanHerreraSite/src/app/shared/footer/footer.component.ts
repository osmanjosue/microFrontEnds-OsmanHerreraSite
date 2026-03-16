import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent implements OnInit {

  // 1. Definición del Formulario y Estado de Carga (isSending)
  public contactForm!: FormGroup;
  public isSending: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 2. Inicialización con las mismas validaciones de tu React
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

  // 3. Getter para facilitar el acceso a errores en el HTML (equivalente a 'errors')
  get f() {
    return this.contactForm.controls;
  }

  // 4. Lógica de Envío (equivalente al onSubmit de React)
  async onSubmit() {
    if (this.contactForm.invalid || this.isSending) return;

    this.isSending = true;

    try {
      // Aquí es donde conectarías con tu backend o servicio de correos
      console.log('Datos a enviar:', this.contactForm.value);

      // Simulamos la espera del envío (como hacía tu useContactForm)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Si el envío es exitoso, reseteamos el formulario
      this.contactForm.reset();

      // Opcional: Podrías añadir una notificación de éxito aquí
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      this.isSending = false;
    }
  }
}
