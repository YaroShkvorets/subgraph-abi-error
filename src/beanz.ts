import { Address } from "@graphprotocol/graph-ts";
import {IERC721} from "../generated/punks/IERC721"
import {Transfer} from "../generated/beanz/Beanz"
import { Bean } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
const bean = new Bean(event.params.tokenId.toString());
bean.name = `Bean - ${event.params.tokenId.toString()}`;
bean.number = event.params.tokenId;

if ("get me an error") {
  const contract = IERC721.bind(Address.fromString("0x8821BeE2ba0dF28761AffF119D66390D594CD280"))
  const tryTokenUri = contract.try_tokenURI(event.params.tokenId);
  if (!tryTokenUri.reverted) {
    bean.uri = tryTokenUri.value;
  }
}

bean.save();
}