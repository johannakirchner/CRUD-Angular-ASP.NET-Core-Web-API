import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'cards';
  cards : Card[] = [];
  card: Card = {
    id: '',
    cardNumber: '',
    cardholderName: '',
    cvc: '',
    expiryMonth: '',
    expiryYear: ''
  }

  constructor(private cardsService: CardsService) {

  }

  // acessa a servive que foi passada no construtor
  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    // acessa a servive que foi passada no construtor
    //
    this.cardsService.getAllCards().subscribe(
      response => {
        this.cards = response;
      }
    );
  }

  onSubmit() {

    if(this.card.id === '') {
      this.cardsService.addCard(this.card).subscribe (
        response => { 
          // faz com que a grid seja updateada
          this.getAllCards();
          // reseta a var para o prox card
          this.card = {
            id: '',
            cardNumber: '',
            cardholderName: '',
            cvc: '',
            expiryMonth: '',
            expiryYear: ''
          }
        }
      );
    }
    else {
      this.updateCard(this.card);
    }

    
  }

  deleteCard(id : string) {
    this.cardsService.deleteCard(id).subscribe(
      response => {
        this.getAllCards();
      }
    )
  }

  populateForm(card: Card) {
    this.card = card;
  }

  updateCard(card: Card) {
    this.cardsService.updateCard(card).subscribe(
      reponse => {
        this.getAllCards();
      }
    );

  }

  
}
