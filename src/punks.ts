import { Address } from "@graphprotocol/graph-ts";
import {IERC721} from "../generated/punks/IERC721"
import {PunkTransfer} from "../generated/punks/Punks"
import {Punk} from "../generated/schema"

export function handlePunkTransfer(event: PunkTransfer): void {
const punk = new Punk(event.params.punkIndex.toString());
punk.name = `Punk - ${event.params.punkIndex.toString()}`;
punk.number = event.params.punkIndex;

const contract = IERC721.bind(Address.fromString("0x8821BeE2ba0dF28761AffF119D66390D594CD280"))
const tryTokenUri = contract.try_tokenURI(event.params.punkIndex);
if (!tryTokenUri.reverted) {
  punk.uri = tryTokenUri.value;
}

punk.save();
}