import Web3 from "web3";
import config from "./config.json"
import { promises as fsPromises } from 'fs';
import { join } from 'path';

export default class WalletGen{
    private web3 : Web3;

    constructor(){
        this.web3 = new Web3();        
    }

    public async autoGen(){
        console.log('Auto gen wallet started!');
        var count :number =0;
        var batch :number =0;
        
        while(true){
            var account = this.web3.eth.accounts.create();
            var address = account.address;
            var privatekey = account.privateKey;
            config.number.forEach(element => {
                var last = address.substring(address.length-element.length);
                if(last == element){
                    console.log(`Address: ${address}\nKey: ${privatekey}`);
                    var svWallet = `[\n\taddress: ${address}\n\tprivate key: ${privatekey}\n]\n`;
                    this.saveWallet('./wallet.txt', svWallet);
                }
            });
            await this.delay(config.delay);
            count++;
            if(count==100){
                batch ++;
                count =0;
                console.log(`${batch} checking ...`);
            }
        };
    }

    private delay(time:number) {
        return new Promise(resolve => setTimeout(resolve, time));
    } 

    private async saveWallet(filename: string, data: any) {
      
      try {
        await fsPromises.writeFile(join(__dirname, filename), data, {
          flag: 'a',
        });
    
        const contents = await fsPromises.readFile(
          join(__dirname, filename),
          'utf-8',
        );

        return contents;
        } catch (err) {
            console.log(err);
            return 'Something went wrong';
        }
    }
}