import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  activeMenu: string = 'home'; // Define o menu ativo inicial

  constructor(private router: Router) {
    // Escuta as mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveMenu();
    });
  }

  navigate(menu: string) {
    const url = menu === 'home' ? '/home' : menu === 'anuncios' ? '/meus-anuncios' : '/meu-perfil';
    this.router.navigateByUrl(url);
  }

  private updateActiveMenu() {
    // Atualiza o menu ativo com base na rota atual
    const currentUrl = this.router.url;


    if (currentUrl === '/home' || currentUrl === '/anuncios') {
      this.activeMenu = 'home';
    } else if (currentUrl === '/meus-anuncios' || currentUrl === '/criar-novo-anuncio' || currentUrl === '/editar-anuncio') {
      this.activeMenu = 'anuncios';
    } else {
      this.activeMenu = 'perfil';
    }
  }
}
