import { Box, Flex, Tooltip } from "@chakra-ui/react";
// import { NotificationsLogo } from "../../assets/constants";
import { NotificationIcon } from "../../assets/constant";

const Notifications = () => {
	return (
		<Box display={{ base: "block", md: "none" }} ml={1}>
			<Tooltip
				hasArrow
				label={"Notifications"}
				placement='right'
				openDelay={500}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
                    ml={.5}
				>
					<NotificationIcon  size={25} />
					<Box display={{ base: "none", md: "block" }}>Notifications</Box>
				</Flex>
			</Tooltip>
		</Box>
	);
};

export default Notifications;
