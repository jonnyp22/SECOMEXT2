import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Importación del RouterModule y Routes
import { HomeComponent } from './home/home.component'; // Importación de componentes
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { NotFoundComponent } from './not-found/not-found.component'; // Componente de error 404

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal (home)
  { path: 'products', component: ProductsListComponent }, // Ruta para la lista de productos
  { path: 'products/new', component: ProductFormComponent }, // Ruta para agregar un nuevo producto
  { path: 'products/edit/:id', component: ProductFormComponent }, // Ruta para editar un producto (con parámetro id)
  { path: 'categories', component: CategoriesListComponent }, // Ruta para la lista de categorías
  { path: 'categories/new', component: CategoryFormComponent }, // Ruta para agregar una nueva categoría
  { path: 'categories/edit/:id', component: CategoryFormComponent }, // Ruta para editar una categoría (con parámetro id)
  { path: '**', component: NotFoundComponent }, // Ruta para manejo de errores (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuración del enrutador con las rutas definidas
  exports: [RouterModule] // Exportar el RouterModule para que esté disponible en otros módulos
})
export class AppRoutingModule { }
