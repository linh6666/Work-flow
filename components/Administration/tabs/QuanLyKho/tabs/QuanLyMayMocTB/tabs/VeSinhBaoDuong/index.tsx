"use client";

import SuaChua from '../SuaChua';
import ModalSua from './modals/ModalSua';
import ModalXoa from './modals/ModalXoa';

export default function VeSinhBaoDuong() {
  return <SuaChua EditModal={ModalSua} DeleteModal={ModalXoa} />;
}
