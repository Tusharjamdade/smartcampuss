
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const paragraph = `
aur project name is SmartCampuss, Our platform is designed to automate and digitize common campus services, such as printing requests and canteen orders, aiming to streamline service delivery, reduce manual effort, and enhance user convenience. 

The platform features separate login panels for users and admins (canteen owners or Xerox shop owners). Users can book seats, place food orders, and send PDFs to Xerox shops for printing. Admins can manage food orders through their panel. 

If the admin is a Xerox shop owner, they can receive printing requests and access PDFs for printouts. Users can send PDFs to any Xerox shops added by the shop owners. The platform offers flexibility for participants to add additional features to further enhance its functionality. 

When users open the website, they are directed to the home page, where they can navigate to the sign-in or sign-up section. Users are presented with two options: Admin or User. If the user selects "Admin," they are redirected to the Store Page to add details of their canteen or Xerox shop.

If they select Canteen Shop, they add their menu and other details. If they select Xerox Shop, no menu is required, and the details are saved directly, completing the admin sign-up process. 

If the user selects "User," they enter their details and click the Sign Up button to save the information, after which they are navigated to the next page.

Once logged in, users can perform two main actions: 
1. Sending documents for printing at any nearest Xerox shop.
2. Booking canteen seats and placing pre-orders to save time and reserve tables in advance.

When the user clicks the Canteen button, they can order food and book tables. When they click the Printing button, they can send documents for printing to the nearest Xerox shop.

Admins can be either canteen owners or Xerox shop owners. A Canteen Owner can:
- Add or update the food menu,
- Set the availability of tables,
- Manage food orders and seat booking requests from users,
- Update the status of food orders (completed or pending).

A Xerox Shop Owner can receive and manage printing requests from users and access PDFs sent for printouts.

This platform provides a seamless experience for both users and admins, ensuring efficient service delivery and enhanced convenience for all participants. 
`;


export async function POST(req:NextRequest) {
    const header = await req.json();
    const search = header.search;
    const API_KEY:string = process.env.GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let prompt = search;
    if(search.length > 10){
        prompt = paragraph + search  + " .Answer in 4 lines";
    }
    const result = await model.generateContent(prompt);
    const responseText = result.response.text()
    return Response.json({
        responseText
    })
}