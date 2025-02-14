import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css'
})
export class ModalConfirmComponent {
  @Input() titulo: string = 'Confirmar';
  @Input() mensagem: string = 'Você tem certeza que deseja realizar esta ação?';
  @Input() textoBotaoConfirmar: string = 'Confirmar';
  @Input() textoBotaoCancelar: string = 'Cancelar';
  @Input() mostrar: boolean = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onConfirmar(): void {
    this.confirmar.emit();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
