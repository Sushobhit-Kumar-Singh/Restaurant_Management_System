import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ICart, IPayment, IProduct, IUser } from '../models/models';
import { Subject } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  changeCart = new Subject();

  constructor(private jwt: JwtHelperService, private navigationService: NavigationService) { }

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);

    return finalPrice;
  }

  //jwt Helper Service : npm install @auth0/angular-jwt

  getUser(): IUser {
    let token = this.jwt.decodeToken();

    let user: IUser = {
      id: token.id,
      firstName: token.firstname,
      lastName: token.lastname,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdat,
      modifiedAt: token.modifiedat
    }
    return user;
  }




  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

  addToCart(product: IProduct) {
    let productid = product.id;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, productid).subscribe((res: any) => {
      console.log(res);
      if (res.toString() === 'inserted') {
        this.changeCart.next(1);
      }
    });
  }

  calculatePayment(cart: ICart, payment: IPayment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart.cartItems) {
      payment.totalAmount += cartitem.product.price;

      payment.amountReduced += cartitem.product.price -
        this.applyDiscount(
          cartitem.product.price,
          cartitem.product.offer.discount
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }

    if (payment.amountPaid <= 200) payment.shipingCharges = 40;
    else payment.shipingCharges = 0;
  }

  calculatePricePaid(cart: ICart) {
    let pricePaid = 0;
    for (let cartitem of cart.cartItems) {
      pricePaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }
    return pricePaid;
  }
}
