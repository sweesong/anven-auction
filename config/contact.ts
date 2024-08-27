export type ContactConfig = typeof contactConfig;

export const contactConfig = {
    contactno: "+60122412818", //must start with +
    //use chatgpt to help generate the whatsapp link message
    //[id], [title] and [address] will be replace according to property
    whatsapp_linkmsg: "https://wa.me/+60122412818?text=%5BFrom%20Web%5D%0A%0AHi%2C%20I'm%20interested%20in%20this%20property%0A%0A*[id]*%0A*[title]*%0A*[address]*%0A*[auctiondate]*%0A*[price]*%0A%0ACould%20you%20provide%20more%20details%3F%20Thank%20you%21",
}

/* 
Example of the message format above

[From Web]

Hi, I'm interested in this property

*[id]*
*[title]*
*[address]*
*[auctiondate]*
*[price]*

Could you provide more details? Thank you!

*/