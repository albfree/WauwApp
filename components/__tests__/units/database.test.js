import { db } from "../../population/config";

describe("testing database connections", ()=>{
  
    test("Searching wauwer: anonymous", ()=>{
      const email = "wauwispp1920@gmail.com";
      let petNumber;
      let id;
      let longitudeUser;
      let latitudeUser;
      const wauwer = db.ref("wauwers")
        .orderByChild("email")
        .equalTo(email)
        .on("child_added", (snap) => {
          petNumber = snap.val().petNumber;
          id = snap.val().id;
          longitudeUser = snap.val().location.longitude;
          latitudeUser = snap.val().location.latitude;
        });
        
        expect(petNumber).toBe(wauwer.petNumber);
        expect(id).toBe(wauwer.id);
        expect(longitudeUser).toBe(wauwer.latitudeUser);
        expect(latitudeUser).toBe(wauwer.latitudeUser);
    });



});