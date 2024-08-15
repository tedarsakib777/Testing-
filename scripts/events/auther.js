module.exports.config = {
  name: "auther",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Nayan",
  description: "Auther Add Notification"
};

module.exports.run = async function({ api, event, Users }) {
  // Array of user IDs to check
  const targetIds = ["100089974857944", "100069926588234"];

  // Loop through each added participant
  for (let i = 0; i < event.logMessageData.addedParticipants.length; i++) {
    const participantId = event.logMessageData.addedParticipants[i].userFbId;
    const name = await Users.getNameUser(participantId);
    
    // Check if the added participant is one of the target users
    for (let j = 0; j < targetIds.length; j++) {
      const id = targetIds[j];
      const nameAuthor = await Users.getNameUser(id);

      // Send message if the names match
      if (name === nameAuthor) {
        api.sendMessage('আমার বস ফারহান কে অ্যাড দেওয়া জন্য। অসংখ্য অসংখ্য (ধন্যবাদ)', event.threadID);
        break; // Stop checking after sending the message
      }
    }
  }
};
