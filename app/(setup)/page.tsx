import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { CreateFirstServerModal } from "@/components/modals/create-first-server-modal";

const SetupPage = async () => {
  const profile = await initialProfile();
  //
  // Search throgh all servers and find the first one
  // that has that profile id in one of the members of thw server
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  // but if user is not part of any server
  return (
    <div>
      <CreateFirstServerModal />
    </div>
  );
};

export default SetupPage;
