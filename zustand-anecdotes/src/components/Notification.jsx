import { useNotification } from '../notification_store.js';
import { useEffect } from 'react';

const Notification = () => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		marginBottom: 10
	};
	//const notif = storeNotification(state => state.notif)
	const notif = useNotification();
	console.log(notif);

	if (notif == ''){
		return null;
	}

	return <div style={style}> {notif} </div>;
};

export default Notification;
