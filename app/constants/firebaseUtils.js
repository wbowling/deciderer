/* global FIREBASE_NAME */
import Firebase from 'firebase'

export const baseRef = new Firebase(`https://${FIREBASE_NAME}.firebaseio.com/`)
