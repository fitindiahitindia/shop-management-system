import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { productResponse } from '../data-type';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { login } from '../interface/login.interface';
import { OrderCheckout } from '../interface/OrderCheckout.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient, private router: Router) {}

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);
  cartData = new EventEmitter<[]>();
  userLoginToken = new EventEmitter<string>();
  adminLoginToken = new EventEmitter<string>();
  myOrderData: any[] = [];
  myOrderPayment = new EventEmitter<any[]>();
  productInCheckout: OrderCheckout[] = [];

  URL = 'https://shop-management-system-api.vercel.app/api/v1';

  private customerCache: any = null;
  private customers$ = new BehaviorSubject<any>(null);

  getCustomer() {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    // 1️⃣ Check cache first
    if (this.customerCache) {
      this.customers$.next(this.customerCache);
      return of(this.customerCache);
    }

    // 2️⃣ If no cache → API call
    return this._http
      .get<productResponse>(this.URL + '/customer/customerViews', { headers })
      .pipe(
        tap((res) => {
          this.customerCache = res; // cache store
          this.customers$.next(res); // BehaviorSubject update
        })
      );
  }

  private customerPageCachePag = new Map<string, any>(); // page-limit cache
  private customersPag$ = new BehaviorSubject<any>(null);

  getCustomerByPag(page: number, limit: number) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    const params = new HttpParams().set('page', page).set('limit', limit);

    const cacheKey = `${page}-${limit}`;

    // 1️⃣ Check cache first
    if (this.customerPageCachePag.has(cacheKey)) {
      this.customersPag$.next(this.customerPageCachePag.get(cacheKey));
      return of(this.customerPageCachePag.get(cacheKey)); // API hit नहीं होगी
    }

    // 2️⃣ API call if no cache
    return this._http
      .get(this.URL + '/customer/customerViewsByPag', { params, headers })
      .pipe(
        tap((res) => {
          this.customerPageCachePag.set(cacheKey, res); // store in cache
          this.customersPag$.next(res); // BehaviorSubject update
        })
      );
  }

  private productCache = new Map<string, any>();
  private products$ = new BehaviorSubject<any>(null);

  getProducts(page: number, limit: number, search: string = '') {
  const adminlogintoken = this.getAdminLoginToken();
  const headers = { Authorization: 'Bearer ' + adminlogintoken };

  // Include search in params
  let params = new HttpParams()
    .set('page', page)
    .set('limit', limit)
    .set('search', search);

  // Cache key must include search
  const cacheKey = `${page}-${limit}-${search}`;

  // If cache exists, return cached response
  if (this.productCache.has(cacheKey)) {
    this.products$.next(this.productCache.get(cacheKey));
    return of(this.productCache.get(cacheKey)); // No API hit
  }

  // API call
  return this._http
    .get(this.URL + '/product/productViewsPagination', { params, headers })
    .pipe(
      tap((response) => {
        this.productCache.set(cacheKey, response); // Store in cache
        this.products$.next(response);
      })
    );
}

  private productCache2 = new Map<string, any>();
  private products2$ = new BehaviorSubject<any>(null);

  get_product(): Observable<any> {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    const cacheKey = 'productViews';

    // 1️⃣ Check cache first
    if (this.productCache2.has(cacheKey)) {
      const cached = this.productCache2.get(cacheKey);
      this.products2$.next(cached);
      return of(cached); // API hit नहीं होगी
    }

    // 2️⃣ API call if no cache
    return this._http
      .get<productResponse>(this.URL + '/product/productViews', { headers })
      .pipe(
        tap((res) => {
          this.productCache2.set(cacheKey, res); // store in cache
          this.products2$.next(res); // update BehaviorSubject
        })
      );
  }

  get_SingleProduct(id: any) {
    return this._http.get(this.URL + '/product/productView/' + id);
  }
  search_product(query: string): Observable<any> {
    const searchProduct = this._http.get<productResponse>(
      this.URL + `/product?q=${query}`
    );
    return searchProduct;
  }

  login_user(credential: login) {
    return this._http.post(this.URL + '/userAuth/login', credential);
  }
  login_admin(credential: object) {
    return this._http.post(this.URL + '/admin/login', credential);
  }
  register_admin(credential: object) {
    return this._http.post(this.URL + '/admin/register', credential);
  }
  createProduct(data: any) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };
    return this._http
      .post(this.URL + '/product/productCreate', data, { headers })
      .pipe(
        tap(() => {
          // 🔥 Cache clear
          this.productCache.clear();
          this.products$.next(null); // reset subject
          // dashboard
          this.dashCache.clear();
          this.dash$.next(null);
        })
      );
  }

  removeSingleProduct(id: any) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    return this._http
      .delete(this.URL + '/product/productDelete/' + id, { headers })
      .pipe(
        tap(() => {
          // 🔥 Clear cache when product is deleted
          this.productCache.clear();
          this.products$.next(null);
        })
      );
  }

  update_SingleProduct(id: any, data: any) {
    return this._http.put(this.URL + '/product/productUpdate/' + id, data).pipe(
      tap(() => {
        // 🔥 Clear cache when product is updated
        this.productCache.clear();
        this.products$.next(null);
      })
    );
  }

  set_OrderStatus(orderId: string, status: object) {
    return this._http.post(this.URL + '/orderStatus/' + orderId, status);
  }
  get_SingleOrderStatus(orderId: any) {
    return this._http.get(this.URL + '/orderStatus/' + orderId);
  }

  private orderCache = new Map<string, any>(); // page-limit cache
  private orders$ = new BehaviorSubject<any>(null);

  create_Order(data: object) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    return this._http
      .post(this.URL + '/order/orderCreate', data, { headers })
      .pipe(
        tap(() => {
          // 🔥 Clear cache after creating new order
          this.orderCache.clear();
          this.orders$.next(null);

          //order
          this.productCache2.clear();
          this.products2$.next(null);

          //product
          this.productCache.clear();
          this.products$.next(null);

          //customer
          this.customerPageCachePag.clear();
          this.customersPag$.next(null);

          //dashboard
          this.dashCache.clear();
          this.dash$.next(null);
        })
      );
  }
  get_UserOrder(orderId: string) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };
    return this._http.get(this.URL + '/order/orderById/' + orderId, {
      headers,
    });
  }
  remove_Order(id: string) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    return this._http
      .delete(this.URL + '/order/orderDelete/' + id, { headers })
      .pipe(
        tap(() => {
          // 🔥 Clear cache after deleting order
          this.orderCache.clear();
          this.orders$.next(null);

          //product
          this.productCache.clear();
          this.products$.next(null);
        })
      );
  }

  get_AllUserOrders(page: number, limit: number) {
    const userlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + userlogintoken };

    const params = new HttpParams().set('page', page).set('limit', limit);

    const cacheKey = `${page}-${limit}`;

    // 1️⃣ Check cache first
    if (this.orderCache.has(cacheKey)) {
      this.orders$.next(this.orderCache.get(cacheKey));
      return of(this.orderCache.get(cacheKey)); // API hit नहीं होगी
    }

    // 2️⃣ API call (only first time per page)
    return this._http
      .get(this.URL + '/order/orderViews', { params, headers })
      .pipe(
        tap((response) => {
          this.orderCache.set(cacheKey, response); // store cache
          this.orders$.next(response); // update BehaviorSubject
        })
      );
  }

  create_Category(category: any) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    return this._http
      .post(this.URL + '/category/categoryCreate', category, { headers })
      .pipe(
        tap(() => {
          // 🔥 Clear category cache after new category is created
          this.categoryCache.clear();
          this.categories$.next(null);
        })
      );
  }

  private categoryCache = new Map<string, any>();
  private categories$ = new BehaviorSubject<any>(null);

  get_Categroy() {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };
    const url = this.URL + '/category/categoryViews';

    if (this.categoryCache.has(url)) {
      this.categories$.next(this.categoryCache.get(url));
      return of(this.categoryCache.get(url));
    }

    return this._http.get(url, { headers }).pipe(
      tap((res) => {
        this.categoryCache.set(url, res);
        this.categories$.next(res);
      })
    );
  }
  remove_Category(id: any) {
    return this._http.delete(this.URL + '/category/categoryDelete/' + id).pipe(
      tap(() => {
        // 🔥 Clear category cache after delete
        this.categoryCache.clear();
        this.categories$.next(null);
      })
    );
  }

  edit_Category(id: any, category: any) {
    return this._http
      .put(this.URL + '/category/categoryUpdate/' + id, category)
      .pipe(
        tap(() => {
          // 🔥 Clear category cache after update
          this.categoryCache.clear();
          this.categories$.next(null);
        })
      );
  }

  upload(file: any) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };
    return this._http.post(this.URL + '/category', file, { headers });
  }

  user_Verify() {
    const userlogintoken = this.getUserLoginToken();
    const headers = { Authorization: 'Bearer ' + userlogintoken };
    return this._http.get(this.URL + '/userAuth/tokenVerify', { headers });
  }

  private adminProfileCache: any = null;
  private adminProfile$ = new BehaviorSubject<any>(null);

  get_AdminProfile(): Observable<any> {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };

    // 1️⃣ Check cache first
    if (this.adminProfileCache) {
      this.adminProfile$.next(this.adminProfileCache);
      return of(this.adminProfileCache); // API hit नहीं होगी
    }

    // 2️⃣ API call if no cache
    return this._http.get(this.URL + '/admin/profile', { headers }).pipe(
      tap((res) => {
        this.adminProfileCache = res; // store cache
        this.adminProfile$.next(res); // BehaviorSubject update
      })
    );
  }

  update_AdminPsw(data: any) {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };
    return this._http.post(this.URL + '/admin/adminPassword', data, {
      headers,
    });
  }

  private dashCache = new Map<string, any>();
  private dash$ = new BehaviorSubject<any>(null);

  getAdminDashAnalsis() {
    const adminlogintoken = this.getAdminLoginToken();
    const headers = { Authorization: 'Bearer ' + adminlogintoken };
    const url = this.URL + '/analysic';

    if (this.dashCache.has(url)) {
      this.dash$.next(this.dashCache.get(url));
      return of(this.dashCache.get(url));
    }

    return this._http.get(url, { headers }).pipe(
      tap((res) => {
        this.dashCache.set(url, res);
        this.dash$.next(res);
      })
    );
  }

  getUserLoginToken() {
    let getToken = JSON.parse(localStorage.getItem('userlogintoken')!);
    return getToken;
  }

  setAdminLoginToken(token: any) {
    let setToken = localStorage.setItem(
      'adminlogintoken',
      JSON.stringify(token)
    );
    this.adminLoginToken.emit(token);
  }
  getAdminLoginToken() {
    let getToken = JSON.parse(localStorage.getItem('adminlogintoken')!);
    if (getToken !== null) {
      return getToken.token;
    } else {
      return null;
    }
  }
  getAdminInfo() {
    let getAdminInfo = JSON.parse(localStorage.getItem('adminlogintoken')!);
    const adminInfo = {
      shopName: getAdminInfo.shopName,
      email: getAdminInfo.email,
      mobileNo: getAdminInfo.mobileNo,
      address: getAdminInfo.address,
      ownerName: getAdminInfo.ownerName,
    };
    return adminInfo;
  }

  removeUserLoginToken(tokenName: string) {
    localStorage.removeItem(tokenName);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  reloadUser() {
    if (localStorage.getItem('userlogintoken')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['']);
    }
  }
  refresh(): void {
    window.location.reload();
  }

  getLocalUserDetail(itemName: string) {
    let localUserDet = JSON.parse(localStorage.getItem(itemName)!);
    return localUserDet;
  }
  setLocalUserDetail(itemName: string, value: any) {
    localStorage.setItem(itemName, JSON.stringify(value));
  }
}
