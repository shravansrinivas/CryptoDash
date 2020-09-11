import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../modelClasses/coin';
import { Exchange } from '../modelClasses/exchange';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor(private http: HttpClient) { }

  getCoin(id): any {
    return this.http.get<Coin>('http://localhost:5984/coins_data/' + id);
  }

  getAllCoins(): any {
    return this.http.get('http://127.0.0.1:5984/coins_data/_all_docs?include_docs=true');
  }

  getExchange(id): any {
    return this.http.get<Exchange>('http://localhost:5984/exchanges/' + id);
  }

  getAllExchanges(): any {
    return this.http.get('http://127.0.0.1:5984/exchanges/_all_docs?include_docs=true');
  }

  getTopCoins(): any {
    const topCoins: Coin[] = [];
    this.getAllCoins().subscribe(coins => {
      coins.rows.forEach(coin => {
        if (coin.doc.rank <= 5) {
          topCoins.push(coin.doc);
        }
      });
    });
    return topCoins;
  }
  getTopExchanges(): any {
    const topExchanges: Exchange[] = [];
    this.getAllExchanges().subscribe(exchanges => {
      exchanges.rows.forEach(exchange => {
        if (exchange.doc.trust_score_rank <= 5) {
          topExchanges.push(exchange.doc);
        }
      });
    });
    return topExchanges;
  }
}
