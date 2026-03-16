import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Binding para el color dinámico del scroll
  @HostBinding('style.--variant') variantColor = '#ff5e00';

  public socialIcons = [
    { title: 'linkedin', icon: '/assets/icons/social1.svg', address: 'https://www.linkedin.com/in/osmanherrera/' },
    { title: 'whatsapp', icon: '/assets/icons/social2.svg', address: 'https://wa.me/50489709082' },
    { title: 'email', icon: '/assets/icons/social3.svg', address: 'mailto:contact@osmanherrera.dev' },
    { title: 'github', icon: '/assets/icons/social4.svg', address: 'https://github.com/osmanjosue' },
  ];

  public certificates = [
  {
    platform: 'Udemy',
    title: 'Master en JavaScript: Aprender JS, jQuery, Angular, NodeJS',
    month: 'Enero',
    date: 2024,
    link: 'https://www.udemy.com/certificate/UC-53ecf1b8-00d0-49a5-a948-ae2e6d2ecfd0/',
  },
  {
    platform: 'Udemy',
    title: 'Angular Avanzado: Lleva tus bases al siguiente nivel - MEAN',
    month: 'Agosto',
    date: 2023,
    link: 'https://www.udemy.com/certificate/UC-03475c4f-f50b-491c-a1e2-4975b8aab381/',
  },
  {
    platform: 'Devtalles',
    title: 'GIT+GitHub: Todo un sistema de control de versiones de cero',
    month: 'Abril',
    date: 2024,
    link: 'https://cursos.devtalles.com/certificates/zl0noyjvkn',
  },
  {
    platform: 'Udemy',
    title: 'Alojamiento de sitio web en modo serverless en Amazon AWS',
    month: 'Julio',
    date: 2022,
    link: 'https://www.udemy.com/certificate/UC-4840328a-96c0-47c9-afa4-04f65c37096d/',
  },
];

  public technologies: any[] = [];
  private techNames = ['CSS', 'HTML', 'JavaScript', 'TypeScript', 'Angular', 'NodeJS', 'GitHub', 'Git', 'MongoDB', 'Photoshop', 'Illustrator', 'JWT', 'Python', 'n8n', 'Docker'];

  ngOnInit() {
    this.technologies = this.techNames.map(name => ({
      title: name,
      icon: `/assets/icons/technologies-${name}.svg`
    }));
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = offset / maxScroll;

    // Lógica simple de cambio de color (Naranja a Morado)
    if (percentage > 0.5) {
      this.variantColor = '#663399'; // RebecaPurple
    } else {
      this.variantColor = '#ff5e00'; // Naranja
    }
  }
}
