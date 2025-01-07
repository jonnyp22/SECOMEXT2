import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si se necesita trabajar con rutas

@Component({
  selector: 'app-root', // El nombre del selector que se usa en la vista
  templateUrl: './app.component.html', // La plantilla HTML asociada
  styleUrls: ['./app.component.css'] // Los estilos CSS asociados
})
export class AppComponent {
  title = 'Mi Aplicación Angular'; // Una propiedad para mostrar en la vista

  constructor(private router: Router) {}

  // Método para navegar a una ruta específica
  navigateToHome() {
    this.router.navigate(['/']);
  }
}
