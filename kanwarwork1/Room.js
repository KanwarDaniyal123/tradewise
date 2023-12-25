import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
    const { roomId } = useParams();
    const containerRef = useRef(null);

    function randomID(len) {
        let result = '';
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
        var maxPos = chars.length;
        len = len || 5;
        for (var i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }

    useEffect(() => {
        let zp;

        const myMeeting = async () => {
            try {
                const appID = 118889031;
                const serverSecret = "f0e21ba9297dc7ff173dde4d6b622060";
                // This should be done server-side in production
                const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID, serverSecret, roomId, randomID(5), randomID(5)
                );

                zp = ZegoUIKitPrebuilt.create(kitToken);
                console.log(zp);
                zp.joinRoom({
                    container: containerRef.current,
                    sharedLinks: [
                        {
                            name: 'Personal link',
                            url: `http://localhost:3000/room/${roomId}`
                        },
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.GroupCall,
                    },
                });
            } catch (error) {
                console.error('Error in setting up the meeting:', error);
            }
        };

        if (containerRef.current) {
            myMeeting();
        }

        // Cleanup function
        return () => {
            if (zp) {
                zp.leaveRoom();
            }
        };
    }, [roomId]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div> // Ensuring the div has dimensions
    );
}

export default Room;
