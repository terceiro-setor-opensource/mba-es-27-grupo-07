import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ANOTHER_TYPE_PREVIEW_PATH,
  DEFAULT_FORMATS,
  DEFAULT_PREVIEW_PATH,
} from './constants';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule, CommonModule, MatIconModule],
  templateUrl: './upload-input-field.component.html',
  styleUrls: ['./upload-input-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadInputField),
      multi: true,
    },
  ],
})
export class UploadInputField implements ControlValueAccessor, OnInit {
  readonly DEFAULT_FORMATS = DEFAULT_FORMATS;

  @Input() formControlName: string = '';
  @Input() label: string = '';
  @Input() fileName?: string = '';
  @Input() acceptFormats?: string = '';
  @Input() isShowPreviewFile?: boolean = true;
  @Input() currentSecurityPreview?: SafeUrl = '';
  @Input() previewWidth?: string = '';
  @Input() previewHeight?: string = '';
  @Input() previewBackgroundColor?: string = '';
  @Input() required?: boolean = true;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {}

  getFormControl() {
    return this.formGroupDirective.control.get(
      this.formControlName
    ) as FormControl;
  }

  writeValue(value: any): void {
    const isFileStartedFilled =
      !value && this.fileName && this.currentSecurityPreview;

    if (isFileStartedFilled) return;

    this.changePreviewField(value);

    if (value) {
      this.fileName = value.name;
    } else {
      this.fileName = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changePreviewField(file: File | undefined) {
    if (!file && this.currentSecurityPreview && this.fileName) return;

    if (!file) {
      this.currentSecurityPreview = DEFAULT_PREVIEW_PATH;
      this.cdRef.detectChanges();
      return;
    }

    const fileTypeNoImage = !file.type.includes('image');
    if (fileTypeNoImage) {
      this.currentSecurityPreview = ANOTHER_TYPE_PREVIEW_PATH;
      this.cdRef.detectChanges();
      return;
    }

    this.currentSecurityPreview = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(file)
    );
    this.cdRef.detectChanges();
  }

  setFormControlError(file?: File) {
    const formControl = this.getFormControl();

    if (this.required && !file) {
      formControl.setErrors({ required: true });

      return;
    }

    formControl.setErrors(null);
  }

  handleChange(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files?.[0];
      this.fileName = file ? file.name : '';
      this.onChange(file);
      this.changePreviewField(file);
      this.onTouched();
      this.setFormControlError(file);
    } catch (error) {
      console.error('Error change input file: ', error);
    }
  }

  checkInputIsError(): boolean {
    const formControl = this.getFormControl();

    if (!formControl) return false;

    return formControl?.touched && formControl?.invalid;
  }
}
