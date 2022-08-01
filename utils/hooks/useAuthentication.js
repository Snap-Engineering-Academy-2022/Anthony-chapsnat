import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore' ;
import db from '../../firebase';

const auth = getAuth();

export function useAuthentication() {
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();
	
	// useEffect(() => {
	// 	const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
	// 		auth, 
	// 		async (user) => {
	// 			if (user) {
	// 				// User is signed in, see docs for a list of available properties
	// 				// https://firebase.google.com/docs/reference/js/firebase.User

					
	// 				setUser(user);
	// 				const userDocRef = doc(db, "User", user.uid);
	// 				const docSnap = await getDoc(userDocRef);
	// 				// console.log(user.uid, '<-- this is the user id');
	// 				if (docSnap.exists()) {
	// 					// console.log(docSnap.data(), '<-- this is the user object');
	// 					setUserData(docSnap.data());
	// 				} else {
	// 					// console.log("No docs");
	// 				}
	// 			} else {
	// 				// User is signed out
	// 				setUser(undefined);
	// 			}
	// 		}
	// 	);

	// 	return unsubscribeFromAuthStatusChanged;
	// }, []);

	// return {
	// 	user,
	// 	userData
	// };

	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User

			setUser(user);

			const userDocRef = doc(db, "User", user.uid);

			const fetchDoc = async () => {
				const docSnap = await getDoc(userDocRef);
				// console.log(user.uid, '<-- this is the user id');

				if (docSnap.exists()) {
					// console.log(docSnap.data(), '<-- this is the user object');
					setUserData(docSnap.data());
				} else {
					// console.log("No docs");
				}

			}

			fetchDoc();
		} else {
			// User is signed out
			setUser(undefined);
		}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user,
		userData
	};
}