import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { siteConfig, Technology, colorAtProgress, scrollProgress } from '@shared/content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Contenido del sitio (compartido con la versión React)
  public readonly c = siteConfig;

  // Binding para el color dinámico del scroll
  @HostBinding('style.--variant') variantColor = colorAtProgress(siteConfig.theme.scrollColors, 0);

  public technologies: Technology[] = [];

  ngOnInit() {
    this.technologies = this.c.skills.technologies.map(name => ({
      title: name,
      icon: `/assets/icons/technologies-${name}.svg`
    }));
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Interpola gradualmente entre los colores del tema según el scroll
    this.variantColor = colorAtProgress(this.c.theme.scrollColors, scrollProgress());
  }
}
