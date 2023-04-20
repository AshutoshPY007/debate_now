let APP_ID = "2bc0f66fbef6450dba6197306c2dcd30"


let token = null;
let uid = String(Math.floor(Math.random() * 10000))

let client;
let channel;

let queryString = window.location.search
let urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')

if(!roomId){
    window.location = 'lobby.html'
}

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}


let constraints = {
    video:{
        width:{min:640, ideal:1920, max:1920},
        height:{min:480, ideal:1080, max:1080},
    },
    audio:true
}

let init = async () => {
    client = await AgoraRTM.createInstance(APP_ID)
    await client.login({uid, token})

    channel = client.createChannel(roomId)
    await channel.join()

    channel.on('MemberJoined', handleUserJoined)
    channel.on('MemberLeft', handleUserLeft)

    client.on('MessageFromPeer', handleMessageFromPeer)

    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    document.getElementById('user-1').srcObject = localStream
}
 

let handleUserLeft = (MemberId) => {
    document.getElementById('user-2').style.display = 'none'
    document.getElementById('user-1').classList.remove('smallFrame')
}

let handleMessageFromPeer = async (message, MemberId) => {

    message = JSON.parse(message.text)

    if(message.type === 'offer'){
        createAnswer(MemberId, message.offer)
    }

    if(message.type === 'answer'){
        addAnswer(message.answer)
    }

    if(message.type === 'candidate'){
        if(peerConnection){
            peerConnection.addIceCandidate(message.candidate)
        }
    }


        /////////////////////////////////////////////
    if(message.type === 'topic'){
       window.alert(message.topic);
    }
/////////////////////////////////////////


}

let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId)
    createOffer(MemberId)
}


let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream
    document.getElementById('user-2').style.display = 'block'

    document.getElementById('user-1').classList.add('smallFrame')


    if(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
        document.getElementById('user-1').srcObject = localStream
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
        }
    }
}

let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId)

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    client.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId)
    ///////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    rand = Math.floor(Math.random() * 30);
    
    switch(rand) {
       
        case 0:
            mystrval= "Climate change: Is human activity the main cause of climate change or are natural factors more significant?"
            break;
          case 1:
            mystrval= "Genetic engineering: Should humans have the ability to genetically modify plants, animals, or humans?"
            break;
          case 2:
            mystrval= "Gun control: Should there be stricter gun control laws to reduce gun violence or should gun ownership be a constitutional right?"
            break;
          case 3:
            mystrval= "Artificial intelligence: Are the benefits of artificial intelligence worth the potential risks and ethical concerns?"
            break;
          case 4:
            mystrval= "Universal basic income: Should governments provide a basic income to all citizens to reduce inequality and poverty?"
            break;
          case 5:
            mystrval= "Capital punishment: Is the death penalty an effective deterrent to crime or is it a violation of human rights?"
            break;
          case 6:
            mystrval= "Censorship: Should governments or organizations have the right to censor or restrict access to certain information or content?"
            break;
          case 7:
            mystrval= "Privacy vs. national security: Should governments have the authority to monitor citizens' online activities in the name of national security?"
            break;
          case 8:
            mystrval= "Euthanasia and assisted suicide: Should individuals have the right to end their own lives or receive assistance in doing so?"
            break;
          case 9:
            mystrval= "Animal rights: Should animals have legal rights and protections similar to humans or are they solely property for human use?"
            break;
          case 10:
            mystrval= "Vaccinations: Should vaccinations be mandatory for all individuals or should it be a personal choice?"
            break;
          case 11:
            mystrval= "Immigration: Should countries have stricter immigration policies to protect their borders or should they prioritize compassion and inclusivity towards immigrants?"
            break;
          case 12:
            mystrval= "Nuclear energy: Is nuclear energy a viable and safe solution to address energy needs and climate change, or does it pose too many risks?"
            break;
          case 13:
            mystrval= "Internet neutrality: Should internet service providers be allowed to prioritize certain websites or content over others, or should the internet remain neutral and open to all?"
            break;
          case 14:
            mystrval= "Education: What should be the role of government in providing education, and how should education be funded and regulated?"
            break;
          case 15:
            mystrval= "Capitalism vs. socialism: Which economic system is more effective in promoting economic growth, reducing inequality, and ensuring societal well-being?"
            break;
          case 16:
            mystrval= "Gender equality: Are gender equality and feminism necessary for achieving a fair and just society, or are they divisive movements that harm traditional gender roles and values?"
            break;
          case 17:
            mystrval= "Medical ethics: Should controversial medical practices such as organ transplantation, human cloning, and genetic editing be allowed or restricted?"
            break;
          case 18:
            mystrval= "Cultural appropriation: Is cultural appropriation a harmful form of cultural exploitation and theft, or is it a natural process of cultural exchange and appreciation?"
            break;
          case 19:
            mystrval= "Electoral systems: Should countries adopt proportional representation, first-past-the-post, or other electoral systems to ensure fair and representative elections?"
            break;
          case 20:
            mystrval= "Space exploration: Should countries invest in space exploration and colonization as a means of scientific discovery and human advancement, or are there ethical concerns and risks associated with space exploration?"
            break;
          case 21:
            mystrval= "Humanitarian interventions: Should countries intervene militarily in other nations to prevent human rights abuses and promote democracy, or should national sovereignty be respected above all else?"
            break;
          case 22:
            mystrval= "Internet censorship: Should governments have the authority to censor or restrict access to online content and information to protect societal values, or should the internet remain free and open?"
            break;
          case 23:
            mystrval= "Indigenous rights: Should indigenous peoples be granted special rights and protections, including land ownership and self-governance, to preserve their cultural heritage and promote social justice?"
            break;
          case 24:
            mystrval= "Nuclear weapons: Should countries possess and maintain nuclear weapons as a deterrent, or should nuclear disarmament be pursued to prevent the catastrophic consequences of nuclear warfare?"
            break;
          case 25:
            mystrval= "Social media: Are social media platforms beneficial for society by promoting connectivity and communication, or do they have negative impacts on mental health, privacy, and societal well-being?"
            break;
          case 26:
            mystrval= "Genetic privacy: Should individuals have control over their genetic data and the right to keep it private, or should genetic information be accessible and shared for scientific and medical purposes?"
            break;
          case 27:
            mystrval= "Environmental conservation vs. economic development: Should efforts to protect the environment take precedence over economic growth and development, or can they coexist harmoniously?"
            break;
          case 28:
            mystrval= "Parental rights vs. children's rights: What are the boundaries between parents' rights to raise their children as they see fit and the rights of children to autonomy, safety, and well-being?"
            break;
          case 29:
            mystrval= "Animal testing: Is animal testing a necessary evil for scientific and medical progress, or is it unethical and inhumane to use animals for experimentation?"
            break;
  
       
       
        default:
             mystrval= "error"
      }
    
    
    window.alert(mystrval);
    
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    client.sendMessageToPeer({text:JSON.stringify({'type':'topic', 'topic':mystrval})}, MemberId)
    ///////////////////////////////////////////////////////////

}


let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId)

    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    client.sendMessageToPeer({text:JSON.stringify({'type':'answer', 'answer':answer})}, MemberId)



}


let addAnswer = async (answer) => {
    if(!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer)
    }
}


let leaveChannel = async () => {
    await channel.leave()
    await client.logout()
}

let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find(track => track.kind === 'video')

    if(videoTrack.enabled){
        videoTrack.enabled = false
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    }else{
        videoTrack.enabled = true
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
}

let toggleMic = async () => {
    let audioTrack = localStream.getTracks().find(track => track.kind === 'audio')

    if(audioTrack.enabled){
        audioTrack.enabled = false
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    }else{
        audioTrack.enabled = true
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
}
  
window.addEventListener('beforeunload', leaveChannel)

document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)

init()
