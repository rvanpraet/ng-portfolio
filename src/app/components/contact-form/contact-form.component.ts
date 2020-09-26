import { ModalContent } from './../modal/modal.component';
import { ContactFormService } from './service/contact-form.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, AfterViewInit {

  @ViewChild('send') sendButton: ElementRef;
  @ViewChild('message') message: ElementRef;


  buttonText = 'Send';
  contactForm: FormGroup;
  contactFormEl: HTMLElement;
  modalContent: ModalContent = null;
  openModal = false;

  constructor(private service: ContactFormService, private fb: FormBuilder, private el: ElementRef) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group(
      {
        subject: '',
        reply_to: '',
        text: ''
      },
      {
        updateOn: 'blur'
      });
    this.contactForm.valueChanges.subscribe(changes => {
      this.sendButton.nativeElement.disabled = !this.contactForm.valid;
    });
  }

  ngAfterViewInit(): void {
    this.contactFormEl = this.el.nativeElement;
  }

  handleModalClose(event: boolean): void {
    this.openModal = event;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.sendButton.nativeElement.value = 'Sending…';
      this.sendButton.nativeElement.disabled = true;

      const params = {
        subject: this.contactForm.get('subject').value,
        reply_to: this.contactForm.get('reply_to').value,
        text: this.contactForm.get('text').value,
      };

      this.service.post(params).subscribe(
        response => this.onSuccess(),
        error => this.onFail()
      );
    }
  }

  onSuccess(): void {
    this.modalContent = {
      title: 'Message sent',
      message: `Thanks for getting in touch! <br/><br/> Hold on tight, I will make sure to reply to your message shortly.`
    };
    this.openModal = true;
    this.sendButton.nativeElement.value = 'Send';
  }

  onFail(): void {
    this.modalContent = {
      title: 'Email could not be sent',
      message: `Please check you have filled all boxes correctly and try again. <br/> <br/> Feel free to give me a call, see icon at the bottom of the page.`
    };
    this.openModal = true;
    this.sendButton.nativeElement.value = 'Send';
  }
}
