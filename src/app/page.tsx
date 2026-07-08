import { redirect } from "next/navigation";

// Launch redirect: `/` sends visitors to the photographer landing.
// When we add the other 7 personas + a persona selector, this becomes
// a real home page. Legacy restaurant page is still reachable at
// `/legacy/restaurant` for anyone with that direct link.

export default function RootPage() {
  redirect("/photographer");
}
