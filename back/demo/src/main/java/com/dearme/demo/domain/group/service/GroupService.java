package com.dearme.demo.domain.group.service;

import com.dearme.demo.domain.group.dto.CreateGroupRequestDto;
import com.dearme.demo.domain.group.dto.CreateGroupResponseDto;
import com.dearme.demo.domain.group.dto.GroupInfoResponseDto;
import com.dearme.demo.domain.group.dto.UpdateGroupRequestDto;

public interface GroupService {
    CreateGroupResponseDto createGroup(String id, CreateGroupRequestDto dto);

    void deleteCounselorGroup(String id, Long groupId);

    GroupInfoResponseDto getGroupInfo(Long groupId);

    void updateGroup(String id, UpdateGroupRequestDto dto);
}
